import React, { useRef } from "react";
import { Modal } from "../components/Modal";
import axios from "axios";
import TeacherTable from "./components/TeacherTable";
import { prisma } from "@/app/lib/prisma";

async function getData() {
  try {
    const data = await prisma.profesor.findMany();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

export default async function Teachers() {
  const data = await getData();

  return (
    <div className="h-full w-full p-5 relative">
      
      <TeacherTable profesores={data} />
    </div>
  );
}
