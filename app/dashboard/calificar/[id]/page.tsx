import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import React from "react";
async function getCourse(id: string) {
  try {
    const data = await prisma.curso.findUnique({
      where: {
        curso_id: parseInt(id),
      },
      include: {
        materia: {
          include: {
            materia_estudiante: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch course");
  }
}
async function CourseQualy({ params: { id } }: { params: { id: string } }) {
  const course = await getCourse(id);
  return (
    <div className="p-5">
      <div className="card bg-white p-5 gap-3">
        <div className="border-b pb-3 border-slate-300">
          <h3 className="text-black">
            Materias para calificar del curso {course?.nombre_curso}
          </h3>
        </div>
        {course?.materia && course?.materia.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {course?.materia.map((i: any, index: number) => (
              <div key={index} className="card border p-5">
                <p>Materia: {i.nombre}</p>
                <p>Cantidad de estudiantes: {i.materia_estudiante.length}</p>
                <Link
                  href={`/dashboard/materias/calificar?materia=${i.materia_id}`}
                  className="mt-5 btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
                >
                  Calificar materia
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-black text-center">
            Parece que este curso no tiene ninguna materia para calificar
          </h1>
        )}
      </div>
    </div>
  );
}

export default CourseQualy;
