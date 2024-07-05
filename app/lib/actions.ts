"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SessionData, sessionOptions } from "./auth/interfaces/session";
import { getIronSession } from "iron-session";
import { prisma } from "./prisma";
import * as bcrypt from "bcrypt";

const SignupFormSchema = z.object({
  username: z.string().trim(),
  password: z
    .string()
    // .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    // .regex(/[0-9]/, { message: "Contain at least one number." })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "Contain at least one special character.",
    // })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
};
export async function signIn(state: FormState, formData: FormData) {
  const session = await getSession();
  const validatedFields = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  }

  const user = await prisma.usuarios.findFirst({
    where: { usuario: validatedFields.username },
    include: {
      rol_usuarios_rolTorol: true,
    },
  });
  if (!user) {
    return {
      message: "Usuario no encontrado",
    };
  }
  const hash = user.password ? user.password : "";
  console.log(hash);
  const match = await bcrypt.compare(validatedFields.password, hash);
  if (!match) {
    return {
      message: "Usuario o contraseña incorrectos",
    };
  }
  session.userId = user?.user_id;
  session.username = user?.usuario ?? "";
  session.rol = user?.rol_usuarios_rolTorol?.nombre_rol ?? "";
  await session.save();
  redirect(`/dashboard/${user.usuario}`);
}
export async function signUp(state: FormState, formData: FormData) {
  const session = await getSession();
  const validateData = {
    user: {
      usuario: formData.get("user") as string,
      password: formData.get("password") as string,
    },
    student: {
      nombre: formData.get("name") as string,
      apellido: formData.get("lastName") as string,
      edad: Number(formData.get("age")),
      direccion: formData.get("address") as string,
      cedula: formData.get("cedula") as string,
      telefono: formData.get("phone") as string,
      correo: formData.get("email") as string,
    },
    course: {
      curso_id: Number(formData.get("course")),
    },
  };
  const findUser = await prisma.usuarios.findFirst({
    where: { usuario: validateData.user.usuario },
  });
  const findStudent = await prisma.alumnos.findFirst({
    where: { cedula: validateData.student.cedula },
  });
  if (findUser) {
    return {
      message: "Este nombre usuario ya existe",
    };
  }
  if (findStudent) {
    return {
      message: "La cedula de este estudiante ya existe",
    };
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(validateData.user.password, salt);
  const user = await prisma.usuarios.create({
    include: { rol_usuarios_rolTorol: true },
    data: {
      ...validateData.user,
      rol: 3,
      password: hash,
    },
  });
  const student = await prisma.alumnos.create({
    data: {
      ...validateData.student,
      user_id: user.user_id,
    },
  });
  session.userId = user?.user_id;
  session.username = user?.usuario ?? "";
  session.rol = "Estudiante";
  await session.save();
  redirect("/dashboard");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
