import { getSession } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import React from "react";

async function getStudent(user: string) {
  try {
    const data = await prisma.alumnos.findFirst({
      where: {
        usuarios: {
          usuario: user,
        },
      },
      include: {
        usuarios: true,
        inscripcion: {
          include: { curso: true },
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch students");
  }
}

async function getUser(user: string) {
  try {
    const data = await prisma.usuarios.findFirst({
      where: {
        usuario: user,
      },
      include: { rol_usuarios_rolTorol: true },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

async function User({ params: { id } }: { params: { id: string } }) {
  const session = await getSession();
  const user: any =
    session.rol === "Estudiante" ? await getStudent(id) : await getUser(id);
  console.log(user.inscripcion);
  return (
    <div className="w-full p-5">
      <div className="card bg-white p-5 gap-3">
        <div className="border-b pb-3 border-slate-300">
          <h1 className="text-black">Información personal</h1>
        </div>
        <div className="w-full grid grid-cols-2">
          <div>
            <h3 className="font-semibold">Nombre y apellido:</h3>
            <p className="text-black">
              {user?.nombre} {user?.apellido}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Usuario:</h3>
            <p className="text-black">{user?.usuarios.usuario}</p>
          </div>
          <div>
            <h3 className="font-semibold">Edad:</h3>
            <p className="text-black">{user?.edad}</p>
          </div>
          <div>
            <h3 className="font-semibold">Correo:</h3>
            <p className="text-black">{user?.correo}</p>
          </div>
          <div>
            <h3 className="font-semibold">Telefono:</h3>
            <p className="text-black">{user?.telefono}</p>
          </div>
          <div>
            <h3 className="font-semibold">Cedula:</h3>
            <p className="text-black">{user?.cedula}</p>
          </div>
          <div>
            <h3 className="font-bold">Estatus:</h3>
            <p className="text-black">{user?.estatus}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="card bg-white p-5 gap-3">
        <div className="border-b pb-3 border-slate-300">
          <h3>Inscripciones</h3>
        </div>
        {user.inscripcion.length > 0 ? (
          <div className="grid grid-cols-3">
            {user.inscripcion.map((i: any, index: number) => (
              <div key={index} className="card border p-5">
                <h3>{i.curso.nombre_curso}</h3>
                <p>
                  Estatus:{" "}
                  {i.estatus == "Activo" && (
                    <span className="badge bg-green-500 text-white border-none">
                      Activo
                    </span>
                  )}
                     {i.estatus == "Inactivo" && (
                    <span className="badge bg-red-500 text-white border-none">
                      Activo
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-black text-center">
            Parece que todavia no tienes inscripciones
          </h1>
        )}
      </div>
    </div>
  );
}

export default User;
