import { prisma } from "@/app/lib/prisma";
import React from "react";

async function getCourse(id: string) {
  try {
    const data = await prisma.curso.findUnique({
      where: {
        curso_id: parseInt(id),
      },
      include: {
        materia: {
          include: { profesor: true },
        },
        inscripcion: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch students");
  }
}

async function Course({ params: { id } }: { params: { id: string } }) {
  const course = await getCourse(id);
  console.log(course);
  return (
    <div className="w-full p-5">
      <div className="card bg-white p-5 gap-3">
        <div className="w-full">
          <h1 className="text-black">Información del curso</h1>
        </div>
        <div className="w-full">
          <div>
            <h3 className="font-semibold">Nombre del curso:</h3>
            <p className="text-black">{course?.nombre_curso}</p>
          </div>
          <div>
            <h3 className="font-semibold">Cantidad de estudiantes:</h3>
            <p className="text-black">{course?.inscripcion.length}</p>
          </div>
          <div>
            <h3 className="font-semibold">Estatus:</h3>
            <p>
              {course?.estatus == "Activo" && (
                <span className="badge bg-green-500 text-white border-none">
                  Activo
                </span>
              )}
              {course?.estatus == "Inactivo" && (
                <span className="badge bg-red-500 text-white border-none">
                  Activo
                </span>
              )}
            </p>
          </div>
        </div>
        <button className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs">
          Inscribirme
        </button>
      </div>
      <br />
      <div className="card bg-white p-5 gap-3">
        <div className="">
          <h3 className="text-black">Materias</h3>
        </div>
        {course?.materia && course?.materia.length > 0 ? (
          <div className="grid grid-cols-3">
            {course.materia.map((i: any, index: number) => (
              <div className="card border p-5" key={index}>
                <h3>{i.nombre}</h3>
                <p>
                  Profesor: {i.profesor.nombre} {i.profesor.apellido}
                </p>
                <p>Horario:</p>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-black text-center">
            Parece que este curso todavia no tiene materias
          </h1>
        )}
      </div>
    </div>
  );
}

export default Course;
