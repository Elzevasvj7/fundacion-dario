import Link from "next/link";

export const TeacherData = ({ teacher }: any) => {
  return (
    <div>
      <div className="w-full p-5">
        <div className="card bg-white p-5 gap-3">
          <div className="border-b pb-3 border-slate-300">
            <h1 className="text-black">Información personal</h1>
          </div>
          <div className="w-full grid grid-cols-2">
            <div>
              <h3 className="font-semibold">Nombre y apellido:</h3>
              <p className="text-black">
                {teacher?.nombre} {teacher?.apellido}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Usuario:</h3>
              <p className="text-black">{teacher?.usuarios.usuario}</p>
            </div>
            <div>
              <h3 className="font-semibold">Correo:</h3>
              <p className="text-black">{teacher?.correo}</p>
            </div>
            <div>
              <h3 className="font-semibold">Telefono:</h3>
              <p className="text-black">{teacher?.telefono}</p>
            </div>
            <div>
              <h3 className="font-semibold">Cedula:</h3>
              <p className="text-black">{teacher?.cedula}</p>
            </div>
            <div>
              <h3 className="font-bold">Estatus:</h3>
              <p className="text-black">{teacher?.estatus}</p>
            </div>
          </div>
        </div>
        <br />
        <div className="card bg-white p-5 gap-3">
          <div className="border-b pb-3 border-slate-300">
            <h3>Materias que imparte</h3>
          </div>
          {teacher.materia.length > 0 ? (
            <div className="grid grid-cols-3">
              {teacher.materia.map((i: any, index: number) => (
                <div key={index} className="card border p-5">
                  <h3>{i.nombre}</h3>
                  <p>Curso: {i.curso.nombre_curso}</p>
                  <p>Periodo: {i.curso.periodo}</p>
                  <Link href={`/dashboard/materias/calificar?materia=${i.materia_id}&profesor=${teacher.profesor_id}`} className="mt-5 btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs">
                    Calificar
                  </Link>
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
