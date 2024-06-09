import React from "react";
import axios from "axios";
import { SubjectsTable } from "@/app/components/subjects/SubjectsTable";
import { prisma } from "@/app/lib/prisma";

async function getSubjects() {
  try {
    const res = await prisma.materia.findMany({
      include: { profesor: true, curso: true },
    });
    return res;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Failed to fetch subject");
  }
}
async function getTeachers() {
  try {
    const data = await prisma.profesor.findMany();
    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Failed to fetch teachers");
  }
}
async function getCourses() {
  try {
    const data = await prisma.curso.findMany();
    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Failed to fetch courses");
  }
}

export default async function Subjects() {
  const subjects = await getSubjects();
  const teachers = await getTeachers();
  const courses = await getCourses();
  console.log(subjects);
  return (
    <SubjectsTable subjects={subjects} teachers={teachers} courses={courses} />
  );
}
