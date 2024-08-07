import EnrollmentForm from "@/app/components/enrollment/EnrollmentForm";
import { getSession } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
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
  const session = await getSession();
  if (session.rol != "Administrador") {
    redirect("/dashboard");
  }
  return (
    <div className="p-5">
      <EnrollmentForm courses={courses} />
    </div>
  );
}

export default CreateEnrollment;
