import React from "react";
import { EnrollmentTable } from "@/app/components/enrollment/EnrollmentTable";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/actions";

async function getEnrollments() {
  const session = await getSession();
  if (session.rol === "Estudiante") {
    try {
      const res = await prisma.inscripcion.findMany({
        where: {
          alumnos: {
            usuarios: {
              usuario : session.username
            }
          }
        },
        include: {
          curso: true,
          alumnos: true,
          pagos: true
        },
      });
      return res;
    } catch (error) {
      console.error("Error: ", error);
      throw new Error("Failed to fetch");
    }
  }
  try {
    const res = await prisma.inscripcion.findMany({
      include: {
        curso: true,
        alumnos: true,
        pagos: true
      },
    });
    return res;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Failed to fetch");
  }
}
export default async function Enrollment() {
  const enrollments = await getEnrollments();
  const session = await getSession();
  console.log(enrollments);
  return (
    <div className="h-full w-full p-5 relative">
      <EnrollmentTable enrollments={enrollments} session={session} />
    </div>
  );
}
