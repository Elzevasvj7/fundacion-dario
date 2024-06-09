"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function createSubject(formData: FormData) {
  const validateData = {
    nombre: formData.get("name")?.toString(),
    curso_id: formData.get("course") ? Number(formData.get("course")) : null,
    profesor_id: formData.get("teacher")
      ? Number(formData.get("teacher"))
      : null,
  };
  const response = await prisma.materia.create({
    data: validateData,
  });
  revalidatePath("/dashboard/materias");
}
export async function updateSubject(subjectId: number, formData: FormData) {
  const data = {
    nombre: formData.get("name")?.toString(),
    curso_id: formData.get("course") ? Number(formData.get("course")) : null,
    profesor_id: formData.get("teacher")
      ? Number(formData.get("teacher"))
      : null,
  };
  const response = await prisma.materia.update({
    where: { materia_id: subjectId },
    data: data,
  });
  revalidatePath("/dashboard/cursos");
}
export async function deleteSubject(subjectId: number) {
  const response = await prisma.materia.delete({
    where: { materia_id: subjectId },
  });
  revalidatePath("/dashboard/cursos");
}
