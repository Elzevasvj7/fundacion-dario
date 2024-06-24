"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
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

export async function qualificatationSubjectStudent(
  state: FormState,
  {
    materia,
    profesor,
    grades,
  }: {
    materia: number;
    profesor: number;
    grades: { materia_est_id: number; alumno_id: number; nota: number }[];
  }
) {
  try {
    const qualy_students = await prisma.materia_estudiante.findMany({
      where: {
        materia_id: materia,
        materia: {
          profesor_id: profesor,
        },
      },
    });
    const q_s_m_ids = qualy_students.map((materia) => materia.materia_est_id);
    grades
      .filter((grade) => q_s_m_ids.includes(grade.materia_est_id))
      .map(async (grade) => {
        return await prisma.materia_estudiante.updateMany({
          where: {
            materia_est_id: grade.materia_est_id,
            alumno_id: grade.alumno_id,
          },
          data: {
            nota: grade.nota,
          },
        });
      });
    return {
      message: "Notas actualizadas correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Parece que hubo un error al actualizar tus notas",
    };
  } finally {
    revalidatePath("/dashboard/materias/calificar");
  }
}
