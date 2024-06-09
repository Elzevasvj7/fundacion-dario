import React from "react";
import axios from "axios";
import { CourseTable } from "@/app/components/course/CourseTable";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/actions";

async function getData() {
  try {
    const data = await prisma.curso.findMany();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

export default async function Courses() {
  const session = await getSession();
  const data = await getData();
  return (
   <CourseTable courses={data} session={session}/>
  );
}
