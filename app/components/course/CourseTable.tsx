"use client";
import { Modal } from "@/app/dashboard/components/Modal";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/app/lib/course/actions";
import Link from "next/link";
import React, { useRef, useState } from "react";

export const CourseTable = ({
  courses,
  session,
}: {
  courses: any[];
  session: any;
}) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const deleteModal = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [status, setStatus] = useState("");

  const [courseId, setCourseId] = useState(0);
  const [type, setType] = useState(false);

  const handlerOpenCreateModal = () => {
    setType(true);
    modalRef.current?.click();
  };
  const handlerOpenUpdateModal = (course: {
    curso_id: number;
    nombre_curso: string;
    monto: number;
    estatus: string;
  }) => {
    setCourseId(course.curso_id);
    setName(course.nombre_curso);
    setCost(course.monto);
    setStatus(course.estatus);

    setType(false);
    modalRef.current?.click();
  };
  const handlerOpenDeleteModal = (id: number) => {
    setCourseId(id);
    deleteModal.current?.showModal();
  };
  const handlerCloseModal = () => {
    setCourseId(0);
    setName("");
    modalRef.current?.click();
  };
  const handlerCreate = (formData: FormData) => {
    createCourse(formData);
    modalRef.current?.click();
  };
  const handlerUpdate = (formData: FormData) => {
    const updateUserWithId = updateCourse.bind(null, courseId);
    updateUserWithId(formData);
    modalRef.current?.click();
  };
  const handlerDelete = () => {
    const deleteUserWithId = deleteCourse.bind(null, courseId);
    deleteUserWithId();
    deleteModal.current?.close();
  };
  console.log(session);
  return (
    <div className=" flex flex-col items-center justify-start w-full p-5 bg">
      <div className="w-full mb-5 card bg-white text-black p-5 flex flex-row items-center gap-2 h-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 100 100"
        >
          <path
            fill="none"
            d="M32.092 55.916h14.575c1.087 0 2.563 2.496 4.734 4.039v-1.776s-.07-1.053.348-1.69c.424-.639 1.308-.809 1.584-.809h14.575s4.401-.74 9.294-3.044l-53.794.514c4.642 2.082 8.684 2.766 8.684 2.766"
          />
          <path
            fill="#000"
            d="M16.868 55.111a24.875 24.875 0 0 1-1.061-.855c.247.396.609.703 1.061.855m2.67-39.55h60.708v35.516c2.128-1.18 3.271-1.984 4.054-2.499v-35.05a2.03 2.03 0 0 0-2.03-2.028H17.508c-1.123 0-2.033.91-2.033 2.028v35.14c.771.486 1.878 1.301 4.063 2.52z"
          />
          <path
            fill="#000"
            d="M87.791 47.978c-.523-.417-1.247-.415-2.396 0c-.335.122-.674.325-1.095.6c-.783.515-1.925 1.319-4.054 2.499c-.657.36-1.373.748-2.241 1.183c-.272.136-.534.247-.803.377c-4.893 2.304-9.294 3.044-9.294 3.044H53.333c-.276 0-1.16.17-1.584.809c-.418.638-.348 1.69-.348 1.69v1.776c.526.373 1.082.707 1.695.918c4.394 1.498 7.367.192 8.664-1.628c1.517-2.134 2.289-3.329 3.955-2.705c1.666.624 0 4.68-2.08 6.763c-2.085 2.084-4.584 3.749-8.12 3.749c-1.486 0-2.926-.223-4.114-.476v15.131c0 4.27 4.538 6.552 7.658 6.552c3.119 0 9.367-1.768 12.387-9.263c3.017-7.493-.205-17.381-.205-17.381s4.888-2.191 9.991-5.414c5.098-3.225 6.455-6.246 6.559-6.67c.1-.427.516-1.136 0-1.554"
          />
          <path
            fill="#000"
            d="M63.635 63.303c2.08-2.083 3.746-6.139 2.08-6.763c-1.666-.624-2.438.571-3.955 2.705c-1.297 1.82-4.27 3.126-8.664 1.628c-.613-.211-1.169-.545-1.695-.918c-2.17-1.543-3.647-4.039-4.734-4.039H32.092s-4.043-.684-8.684-2.766c-.466-.21-.935-.418-1.411-.657a59.295 59.295 0 0 1-2.459-1.306c-2.185-1.219-3.292-2.033-4.063-2.52c-.321-.203-.593-.355-.871-.455c-1.144-.416-1.873-.416-2.394 0c-.518.418-.104 1.128 0 1.553c.08.325.913 2.184 3.596 4.49a26.416 26.416 0 0 0 2.963 2.181c5.098 3.227 9.991 5.412 9.991 5.412s-3.227 9.886-.205 17.381c3.018 7.494 9.263 9.27 12.385 9.27c3.123 0 7.661-2.297 7.661-6.564V65.804s1.152.42 2.799.771c1.188.253 2.628.476 4.114.476c3.537.001 6.036-1.664 8.121-3.748m-2.618-28.922a9.059 9.059 0 0 0-9.058 9.057c0 4.999 4.055 9.056 9.058 9.056c4.998 0 9.052-4.057 9.052-9.056c0-5-4.054-9.057-9.052-9.057"
          />
          <path
            fill="#000"
            d="M39.544 34.381c-5 0-9.053 4.057-9.053 9.057c0 4.999 4.052 9.056 9.053 9.056c5.003 0 9.058-4.057 9.058-9.056c0-5-4.055-9.057-9.058-9.057"
          />
        </svg>
        <h1>Lista de cursos</h1>
        {session.rol == "Administrador" && (
          <button
            onClick={handlerOpenCreateModal}
            className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
          >
            Nuevo Curso
          </button>
        )}
      </div>
      <div className="overflow-x-auto card bg-white text-black w-full h-[90%]">
        <table className="table w-full h-full">
          <thead className="[&>tr]:border-none">
            <tr>
              <th>ID</th>
              <th>Nombre del curso</th>
              <th>Costo</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-none">
            {courses.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-teal-500 hover:text-white cursor-pointer transition duration-500"
              >
                <th>{index + 1}</th>
                <td>{item.nombre_curso}</td>
                <td>${item.monto}</td>
                <td>
                  {item?.estatus == "Activo" && (
                    <span className="badge bg-green-500 text-white border-none">
                      Activo
                    </span>
                  )}
                  {item?.estatus == "Inactivo" && (
                    <span className="badge bg-red-500 text-white border-none">
                      Inactivo
                    </span>
                  )}
                </td>
                <td>
                  <div className="w-full flex gap items-center justify-start mb-2">
                    <Link
                      href={`/dashboard/cursos/${item.curso_id}`}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-110 transition duration-300 text-white"
                    >
                      Ver curso
                    </Link>
                  </div>
                  {session.rol == "Administrador" && (
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handlerOpenUpdateModal(item)}
                        className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-110 transition duration-300"
                      >
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
                      </button>
                      <button
                        onClick={() => handlerOpenDeleteModal(item.curso_id)}
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input type="checkbox" ref={modalRef} className="modal-toggle" />
      <Modal>
        <div className="h-[10%]">
          <h3 className="text-center font-bold text-lg text-[#009688]">
            Crear Curso
          </h3>
        </div>
        <div className="overflow-x-auto h-[90%] p-2">
          <form action={type ? handlerCreate : handlerUpdate}>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Nombre</span>
              </div>
              <input
                required
                name="name"
                type="text"
                placeholder="Nombre"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Costo</span>
              </div>
              <input
                required
                name="monto"
                type="number"
                placeholder="Monto"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setCost(parseInt(e.target.value))}
                value={cost}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-black text-sm">Estado</span>
              </div>
              <select
                name="estatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              >
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </select>
            </label>
            <div className="modal-action justify-center gap-2">
              <button
                type="submit"
                className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
              >
                Guardar
              </button>
              <label
                onClick={handlerCloseModal}
                className="btn btn-sm rounded-sm bg-red-500 hover:bg-red-600 hover:scale-110 transition duration-500 text-white border-none"
              >
                Cancelar
              </label>
            </div>
          </form>
        </div>
      </Modal>
      <dialog ref={deleteModal} className="modal">
        <div className="modal-box h-auto bg-slate-50 p-5">
          <h3 className="text-center font-bold text-lg text-[#009688]">
            ¿Seguro que quieres eliminar este curso?
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
