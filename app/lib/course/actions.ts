"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function createCourse(formData: FormData) {
  const validateData = {
    nombre_curso: formData.get("name")?.toString(),
  };
  const response = await prisma.curso.create({
    data: { ...validateData },
  });
  revalidatePath("/dashboard/cursos");
}
export async function updateCourse(courseId: number, formData: FormData) {
  const data = {
    nombre_curso: formData.get("name")?.toString(),
  };

  const response = await prisma.curso.update({
    where: { curso_id: courseId },
    data: { ...data },
  });
  revalidatePath("/dashboard/cursos");
}
export async function deleteCourse(courseId: number) {
  const response = await prisma.curso.delete({ where: { curso_id: courseId } });
  revalidatePath("/dashboard/cursos");
}
