import Link from "next/link";
import React from "react";

export const AdminData = ({ admin }: any) => {
  return (
    <div>
      <div className="w-full p-5">
        <div className="card bg-white p-5 gap-3">
          <div className="border-b pb-3 border-slate-300">
            <h1 className="text-black">Información personal</h1>
          </div>
          <div className="w-full grid grid-cols-2">
            <div>
              <h3 className="font-semibold">Nombre de usuario:</h3>
              <p className="text-black">{admin?.usuario}</p>
            </div>
            <div>
              <h3 className="font-semibold">Rol:</h3>
              <p className="text-black">{admin?.rol_usuarios_rolTorol.nombre_rol}</p>
            </div>
          </div>
        </div>
        <br />
        <div className="card bg-white p-5 gap-3">
          <div className="border-b pb-3 border-slate-300">
            <h3>Cursos para calificar</h3>
          </div>
          {admin.cursos.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {admin.cursos.map((i: any, index: number) => (
                <div key={index} className="card border p-5">
                  <h3>{i.nombre}</h3>
                  <p>Curso: {i.nombre_curso}</p>
                  <p>Cantidad de estudiante: {i.inscripcion.length}</p>
                  <p>Cantidad de materias: {i.materia.length}</p>
                  {i.materia.length > 0 && i.inscripcion.length > 0 && (
                    <Link
                      href={`/dashboard/calificar/${i.curso_id}`}
                      className="mt-5 btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
                    >
                      Calificar
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-black text-center">
              Parece que todavia no impartes ninguna materia
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
