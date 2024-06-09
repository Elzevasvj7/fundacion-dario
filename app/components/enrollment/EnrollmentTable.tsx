"use client";
import { deleteEnrollment } from "@/app/lib/enrollment/actions";
import Link from "next/link";
import React, { useRef, useState } from "react";

export const EnrollmentTable = ({ enrollments }: { enrollments: any[] }) => {
  const [enrollmentId, setEnrollmentId] = useState(0);
  const deleteModal = useRef<HTMLDialogElement>(null);

  const handlerOpenDeleteModal = (id: number) => {
    setEnrollmentId(id);
    deleteModal.current?.showModal();
  };

  const handlerDelete = () => {
    const deleteEnrollmentWithId = deleteEnrollment.bind(null, enrollmentId);
    deleteEnrollmentWithId();
    deleteModal.current?.close();
  };
  return (
    <div className="w-full">
      <div className="w-full mb-5 bg-white text-black p-5 flex items-center gap-2 h-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#000"
            d="M6 20q-.825 0-1.412-.587T4 18q0-.825.588-1.412T6 16q.825 0 1.413.588T8 18q0 .825-.587 1.413T6 20m0-6q-.825 0-1.412-.587T4 12q0-.825.588-1.412T6 10q.825 0 1.413.588T8 12q0 .825-.587 1.413T6 14m0-6q-.825 0-1.412-.587T4 6q0-.825.588-1.412T6 4q.825 0 1.413.588T8 6q0 .825-.587 1.413T6 8m6 0q-.825 0-1.412-.587T10 6q0-.825.588-1.412T12 4q.825 0 1.413.588T14 6q0 .825-.587 1.413T12 8m6 0q-.825 0-1.412-.587T16 6q0-.825.588-1.412T18 4q.825 0 1.413.588T20 6q0 .825-.587 1.413T18 8m-6 6q-.825 0-1.412-.587T10 12q0-.825.588-1.412T12 10q.825 0 1.413.588T14 12q0 .825-.587 1.413T12 14m1 6v-3.075l6.575-6.55l3.075 3.05L16.075 20zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z"
          />
        </svg>
        <h1>Lista de inscripciones</h1>
        <Link
          href={"/dashboard/inscripciones/crear-inscripcion"}
          className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
        >
          Nueva Inscripcion
        </Link>
      </div>
      <div className="overflow-x-auto bg-white text-black w-full h-[90%]">
        <table className="table w-full h-full">
          <thead className="[&>tr]:border-none">
            <tr>
              <th>ID</th>
              <th>Alumno</th>
              <th>Curso</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-none">
            {enrollments.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-teal-500 hover:text-white cursor-pointer transition duration-500"
              >
                <th>{index + 1}</th>
                <th>
                  {item.alumnos.nombre} {item.alumnos.apellido}
                </th>
                <td>{item.curso?.nombre_curso}</td>
                <td>
                  <span className="badge bg-green-500 text-white border-none">
                    Activo
                  </span>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    {/* <button className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-110 transition duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
                        />
                      </svg>
                    </button> */}
                    <button
                      onClick={() =>
                        handlerOpenDeleteModal(item.inscripcion_id)
                      }
                      className="btn btn-sm bg-red-500 border-none hover:bg-red-600 hover:scale-110 transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="#ffffff"
                          d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M112 168a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm0-120H96v-8a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog ref={deleteModal} className="modal">
        <div className="modal-box h-auto bg-slate-50 p-5">
          <h3 className="text-center font-bold text-lg text-[#009688]">
            ¿Seguro que quieres eliminar esta materia?
          </h3>
          <div className="modal-action justify-center">
            <form action={handlerDelete}>
              <button className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none">
                Eliminar
              </button>
            </form>
            <form method="dialog">
              <button className="btn btn-sm rounded-sm bg-red-500 hover:bg-red-600 hover:scale-110 transition duration-500 text-white border-none">
                Cerrar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
