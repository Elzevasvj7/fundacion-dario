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

export async function createTeacher(formData: FormData) {
  const validateData = {
    nombre: formData.get("name")?.toString(),
    apellido: formData.get("lastName")?.toString(),
    telefono: formData.get("phone")?.toString(),
    direccion: formData.get("address")?.toString(),
    correo: formData.get("email")?.toString(),
    cedula: formData.get("cedula")?.toString(),
    nivel_est: formData.get("level_est")?.toString(),
    estatus: 1,
  };
  const response = await prisma.profesor.create({
    data: { ...validateData },
  });
  revalidatePath("/dashboard/profesores");
}
export async function updateTeacher(teacherId: number, formData: FormData) {
  const validateData = {
    nombre: formData.get("name")?.toString(),
    apellido: formData.get("lastName")?.toString(),
    telefono: formData.get("phone")?.toString(),
    direccion: formData.get("address")?.toString(),
    correo: formData.get("email")?.toString(),
    cedula: formData.get("cedula")?.toString(),
    nivel_est: formData.get("level_est")?.toString(),
    estatus: 1,
  };

  const response = await prisma.profesor.update({
    where: { profesor_id: teacherId },
    data: { ...validateData },
  });
  revalidatePath("/dashboard/profesores");
}
export async function deleteTeacher(teacherId: number) {
  const response = await prisma.profesor.delete({
    where: { profesor_id: teacherId },
  });
  revalidatePath("/dashboard/profesores");
}
