"use server";

import { prisma } from "@/app/lib/prisma";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  nombre: z.string({
    message: "El nombre es requerido.",
    required_error: "El nombre es requerido",
  }),
  apellido: z.string({ message: "El apellido es requerido." }),
  edad: z.number().int({ message: "La edad debe ser un número entero." }),
  telefono: z.string({ required_error: "El teléfono es requerido." }),
  correo: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "El correo electrónico debe ser válido." }),
  direccion: z.string({ message: "La dirección es requerida." }),
  cedula: z.string({ message: "La cédula es requerida." }),
});

export async function createStudent(formData: FormData) {
  const validateData = schema.safeParse({
    nombre: formData.get("name"),
    apellido: formData.get("lastName"),
    edad: Number(formData.get("age")),
    telefono: formData.get("phone"),
    direccion: formData.get("address"),
    correo: formData.get("email"),
    cedula: formData.get("cedula"),
    estatus: 1,
  });
  if (!validateData.success) {
    console.log(validateData.error.flatten().fieldErrors);
    return {
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/student",
    {
      ...validateData.data,
    }
  );
  revalidatePath("/dashboard/alumnos");
}
export async function updateStudent(userId: number, formData: FormData) {
  const validateData = schema.safeParse({
    nombre: formData.get("name") as string,
    apellido: formData.get("lastName") as string,
    edad: Number(formData.get("age")),
    telefono: formData.get("phone") as string,
    direccion: formData.get("address") as string,
    correo: formData.get("email") as string,
    cedula: formData.get("cedula") as string,
    estatus: 1,
  });
  console.log("user", userId);
  console.log(formData);
  if (!validateData.success) {
    console.log(validateData.error.flatten().fieldErrors);
    return {
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  const student = await prisma.alumnos.update({
    where: { alumno_id: userId },
    data: validateData.data,
  });
  revalidatePath("/dashboard/alumnos");
}
export async function deleteStudent(userId: number) {
  const user = await prisma.usuarios.findUnique({
    where: { user_id: userId },
  });
  const deleteStudent = await prisma.alumnos.delete({
    where: { user_id: user?.user_id },
  });
  revalidatePath("/dashboard/alumnos");
}
