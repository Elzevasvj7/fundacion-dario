import { QualificationReport } from "@/app/components/qualification/QualificationReport";
import { generateReportCourses } from "@/app/lib/course/actions";
import { prisma } from "@/app/lib/prisma";
import React from "react";
import { useFormState } from "react-dom";

async function getCourses() {
  try {
    const data = await prisma.curso.findMany();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

export default async function QualyReports() {
  const courses = await getCourses();
  return (
    <div className=" flex flex-col items-center justify-start w-full p-5 bg">
      <div className="w-full mb-5 card bg-white text-black p-5 flex flex-row items-center gap-2 h-[10%]">
        <h1>Generar reporte de calificaciones por curso</h1>
      </div>
      <QualificationReport courses={courses} />
    </div>
  );
}
