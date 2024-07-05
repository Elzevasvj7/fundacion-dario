import { AdminData } from "@/app/components/data/AdminData";
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

async function getAdminData(user: string) {
  try {
    const data = await prisma.usuarios.findFirst({
      where: {
        usuario: user,
      },
      include: {
        rol_usuarios_rolTorol : true
      }
    });
    const courses = await prisma.curso.findMany({
      include: {
        inscripcion: true,
        materia: true
      }
    });
    const payments = await prisma.pagos.findMany({
      where: {
        estatus: "pendiente",
      },
    });
    return {
      ...data,
      cursos: [...courses],
      pagos: [...payments],
    };
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
    return <StudentData student={student} payments={payments} />;
  }
  if (session.rol == "Administrador") {
    const teacher = await getAdminData(id);
    console.log(teacher);
    return <AdminData admin={teacher} />;
  }
  if (session.rol == "Secretario") {
    const teacher = await getAdminData(id);
    return <TeacherData teacher={teacher} />;
  }
}

export default User;
