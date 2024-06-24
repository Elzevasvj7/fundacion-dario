import { StudentData } from "@/app/components/data/StudentData";
import { TeacherData } from "@/app/components/data/TeacherData";
import { getSession } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import React from "react";

async function getStudent(user: string) {
  try {
    const session = await getSession();
    const data = await prisma.alumnos.findFirst({
      where: {
        usuarios: {
          usuario: user,
        },
      },
      include: {
        usuarios: true,
        inscripcion: {
          include: {
            curso: true,
          },
        },
        materia_estudiante: {
          include: { materia: { include: { curso: true } } },
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch students");
  }
}

async function getPayments(user: string) {
  try {
    const data = await prisma.pagos.findMany({
      where: {
        inscripcion: {
          alumnos: {
            usuarios: {
              usuario: user,
            },
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch students");
  }
}

async function getTeacher(user: string) {
  try {
    const data = await prisma.profesor.findFirst({
      where: {
        usuarios: {
          usuario: user,
        },
      },
      include: {
        usuarios: true,
        materia: {
          include: {
            curso: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch teacher");
  }
}

async function getUser(user: string) {
  try {
    const data = await prisma.usuarios.findFirst({
      where: {
        usuario: user,
      },
      include: { rol_usuarios_rolTorol: true },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

async function User({ params: { id } }: { params: { id: string } }) {
  const user = await getUser(id);
  const session = await getSession();
  if (session.rol === "Estudiante") {
    const student = await getStudent(id);
    const payments = await getPayments(id);
    console.log(payments);
    return <StudentData student={student} payments={payments} />;
  }
  if (session.rol == "Profesor") {
    const teacher = await getTeacher(id);
    return <TeacherData teacher={teacher} />;
  }
}

export default User;
