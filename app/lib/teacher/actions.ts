"use server";
import { error } from "console";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
      error?: string;
    }
  | undefined;
export async function createTeacherAction(
  state: FormState,
  formData: FormData
) {
  try {
    const validateData = {
      user: {
        usuario: formData.get("user")?.toString(),
        password: formData.get("password") as string,
      },
      teacher: {
        nombre: formData.get("name")?.toString(),
        apellido: formData.get("lastName")?.toString(),
        direccion: formData.get("address")?.toString(),
        cedula: formData.get("cedula")?.toString(),
        telefono: formData.get("phone")?.toString(),
        correo: formData.get("email")?.toString(),
        nivel_est: formData.get("nivel_est")?.toString(),
      },
    };
    const findUser = await prisma.usuarios.findFirst({
      where: { usuario: validateData.user.usuario },
    });
    const findStudent = await prisma.profesor.findFirst({
      where: { cedula: validateData.teacher.cedula },
    });
    if (findUser) {
      throw new Error("Este nombre usuario ya existe");
    }
    if (findStudent) {
      throw new Error("La cedula de este profesor ya existe");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(validateData.user.password, salt);
    const user = await prisma.usuarios.create({
      data: {
        ...validateData.user,
        rol: 4,
        password: hash,
      },
    });
    const profesor = await prisma.profesor.create({
      data: {
        ...validateData.teacher,
        user_id: user.user_id,
      },
    });
    return {
      message: `Profesor creado con exito `,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      error: e.message || e.messages,
    };
  } finally {
    revalidatePath("/dashboard/profesores");
  }
}
