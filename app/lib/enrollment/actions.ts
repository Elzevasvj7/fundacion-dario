"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function createEnrollment(formData: FormData) {
  try {
    const validateData = {
      user: {
        usuario: formData.get("user")?.toString(),
        password: formData.get("password")?.toString(),
      },
      student: {
        nombre: formData.get("name")?.toString(),
        apellido: formData.get("lastName")?.toString(),
        edad: Number(formData.get("age")),
        direccion: formData.get("address")?.toString(),
        cedula: formData.get("cedula")?.toString(),
        telefono: formData.get("phone")?.toString(),
        correo: formData.get("email")?.toString(),
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
      throw new Error("Este nombre usuario ya existe");
    }
    if (findStudent) {
      throw new Error("La cedula de este estudiante ya existe");
    }
    const user = await prisma.usuarios.create({
      data: validateData.user,
    });
    const student = await prisma.alumnos.create({
      data: {
        ...validateData.student,
        user_id: user.user_id,
      },
    });
    const enrollment = prisma.inscripcion.create({
      data: {
        alumno_id: student.alumno_id,
        curso_id: validateData.course.curso_id,
        turno_id: 1,
      },
    });
    return {
      data: enrollment,
      error: null,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      data: null,
      error: e.message || e.messages,
    };
  }
}

export async function deleteEnrollment(enrollmentId: number) {
  const response = await prisma.inscripcion.delete({
    where: { inscripcion_id: enrollmentId },
  });
  revalidatePath("/dashboard/inscripciones");
}
