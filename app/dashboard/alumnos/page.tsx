import React from "react";
import axios from "axios";
import StudentsTable from "./components/StudentsTable";
import { prisma } from "@/app/lib/prisma";

async function getData() {
  try {
    const data = await prisma.alumnos.findMany({ include: { usuarios: true } });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

export default async function Students() {
  const data = await getData();
  return (
    <div className="h-full w-full p-5 relative">
      <StudentsTable alumnos={data} />
    </div>
  );
}
