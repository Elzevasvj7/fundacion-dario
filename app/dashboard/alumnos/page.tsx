import React from "react";
import axios from "axios";
import StudentsTable from "./components/StudentsTable";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/actions";
import { redirect } from "next/navigation";

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
  const session = await getSession();
  if (session.rol != "Administrador") {
    redirect("/dashboard");
  }
  console.log(data);
  return (
    <div className="h-full w-full p-5 relative">
      <StudentsTable alumnos={data} />
    </div>
  );
}
