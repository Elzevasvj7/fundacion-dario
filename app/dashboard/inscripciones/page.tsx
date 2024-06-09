import React from "react";
import axios from "axios";
import { EnrollmentTable } from "@/app/components/enrollment/EnrollmentTable";
import { prisma } from "@/app/lib/prisma";

async function getEnrollments() {
  try {
    const res = await prisma.inscripcion.findMany({
      include: {
        curso: true,
        alumnos: true,
      },
    });
    return res;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Failed to fetch teachers");
  }
}
export default async function Enrollment() {
  const enrollments = await getEnrollments();
  return (
    <div className="h-full w-full p-5 relative">
      <EnrollmentTable enrollments={enrollments} />
    </div>
  );
}
