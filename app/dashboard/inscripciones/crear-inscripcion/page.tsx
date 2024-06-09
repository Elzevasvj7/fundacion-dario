import EnrollmentForm from "@/app/components/enrollment/EnrollmentForm";
import { prisma } from "@/app/lib/prisma";
import axios from "axios";
import React from "react";

async function getCourses() {
  try {
    const data = await prisma.curso.findMany();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}
async function CreateEnrollment() {
  const courses = await getCourses();
  return (
    <div className="p-5">
      <h1>Crear inscripcion</h1>
      <EnrollmentForm courses={courses} />
    </div>
  );
}

export default CreateEnrollment;
