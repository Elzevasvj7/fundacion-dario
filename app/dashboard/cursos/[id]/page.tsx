import { EnrollmentCourse } from "@/app/components/enrollment/EnrollmentCourse";
import { getSession } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import { format } from "@formkit/tempo";
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
    throw new Error("Failed to fetch course");
  }
}

async function getEnrollment(courseId: string, studentId?: number) {
  try {
    const user = await prisma.alumnos.findFirst({
      where: {
        usuarios: {
          user_id: studentId,
        },
      },
    });
    if (user) {
      const data = await prisma.inscripcion.findFirst({
        where: {
          AND: {
            alumno_id: user.alumno_id,
            curso_id: parseInt(courseId),
          },
        },
      });
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch enrollment");
  }
}

async function Course({ params: { id } }: { params: { id: string } }) {
  const course = await getCourse(id);
  const session = await getSession();
  const enrollment =
    session.rol === "Estudiante"
      ? await getEnrollment(id, session.userId)
      : null;

  return (
    <div className="w-full p-5">
      <div className="card bg-white p-5 gap-3">
        <div className="w-full">
          <h1 className="text-black">Información del curso</h1>
        </div>
        <div className="flex">
          <div className="w-full grid grid-cols-2">
            <div>
              <h3 className="font-semibold">Nombre del curso:</h3>
              <p className="text-black">{course?.nombre_curso}</p>
            </div>
            <div>
              <h3 className="font-semibold">Cantidad de estudiantes:</h3>
              <p className="text-black">{course?.inscripcion.length}</p>
            </div>
            <div>
              <h3 className="font-semibold">Estatus del curso:</h3>
              <p>
                {course?.estatus == "Activo" && (
                  <span className="badge bg-green-500 text-white border-none">
                    Activo
                  </span>
                )}
                {course?.estatus == "Inactivo" && (
                  <span className="badge bg-red-500 text-white border-none">
                    Inactivo
                  </span>
                )}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Costo del curso:</h3>
              <p className="text-black text-2xl">${course?.monto}</p>
            </div>
            {course?.fechaInicio && (
              <div>
                <h3>Fecha de inicio del curso</h3>
                <p className="text-black">{format(course.fechaInicio, 'full')}</p>
              </div>
            )}
             {course?.fechaFin && (
              <div>
                <h3>Fecha de finalización del curso</h3>
                <p className="text-black">{format(course.fechaFin, 'full')}</p>
              </div>
            )}
          </div>
        </div>
        {session.rol === "Estudiante" && enrollment?.estatus === "Activa" && (
          <p>Ya tienes un inscripcion activa</p>
        )}
        {session.rol === "Estudiante" && enrollment?.estatus === "Activa" && (
          <p>Ya tienes un inscripcion activa</p>
        )}
        {session.rol === "Estudiante" &&
          !enrollment &&
          course?.estatus == "Activo" &&
          course.materia.length > 0 && <EnrollmentCourse courseId={id} />}
        {session.rol === "Estudiante" &&
          enrollment?.estatus === "Pendiente" && (
            <p>Pareces que tienes una inscripcion pendiente de pago</p>
          )}
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
                <p>Horario: Mañana</p>
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
