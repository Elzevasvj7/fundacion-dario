"use client";
import { Modal } from "@/app/dashboard/components/Modal";
import {
  createSubject,
  deleteSubject,
  updateSubject,
} from "@/app/lib/subjects/actions";
import React, { useRef, useState } from "react";

export const SubjectsTable = ({
  subjects,
  courses,
  teachers,
}: {
  subjects: any[];
  courses: any[];
  teachers: any[];
}) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const deleteModal = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState(0);
  const [course, setCourse] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [type, setType] = useState(false);

  const handlerOpenCreateModal = () => {
    setType(true);
    modalRef.current?.click();
  };
  const handlerOpenUpdateModal = (subject: {
    curso_id: number;
    nombre: string;
    profesor_id: number;
    materia_id: number;
  }) => {
    setSubjectId(subject.materia_id);
    setName(subject.nombre);
    setTeacher(subject.profesor_id);
    setCourse(subject.curso_id);
    setType(false);
    modalRef.current?.click();
  };
  const handlerOpenDeleteModal = (id: number) => {
    setSubjectId(id);
    deleteModal.current?.showModal();
  };
  const handlerCloseModal = () => {
    setSubjectId(0);
    setName("");
    setCourse(0);
    setTeacher(0);
    modalRef.current?.click();
  };
  const handlerCreate = (formData: FormData) => {
    createSubject(formData);
    modalRef.current?.click();
  };
  const handlerUpdate = (formData: FormData) => {
    const updateSubjectWithId = updateSubject.bind(null, subjectId);
    updateSubjectWithId(formData);
    modalRef.current?.click();
  };
  const handlerDelete = () => {
    const deleteSubjectWithId = deleteSubject.bind(null, subjectId);
    deleteSubjectWithId();
    deleteModal.current?.close();
  };
  return (
    <div className="h-full flex flex-col items-center justify-start w-full p-5 bg">
      <div className="w-full mb-5 bg-white text-black p-5 flex items-center gap-2 h-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fill="#000"
            d="M14.222.03c-1.812 1.753-3.604 3.49-3.604 3.49l.644 1.31c.873-.864 1.75-1.625 2.587-2.472c1.762 3.869 2.963 6.987 4.44 11.109c.483 1.339.384 1.399-.771 2.122c-1.857.923-2.445 1.53-4.658 3.884h1.515c1.85-1.673 2.536-2.263 4.853-3.484c.82-.473.932-1.07.596-2C18.74 10.977 16.39 4.484 14.222.03"
          />
          <path
            fill="#000"
            d="M9.498.071C8.172.966 7.149 2.254 5.996 3.358l.473 1.508c.903-.71 1.688-1.569 2.5-2.38l4.376 10.977c.252.743-.145 1.405-.944 2.125c-.956.769-2.925 2.56-3.818 3.926h1.358c1.426-1.464 1.683-1.663 3.306-3.068c1.09-1.112 2.074-1.681 1.56-3.106z"
          />
          <path
            fill="#000"
            d="M5.023 0C4.67.12 4.376.347 4.1.588a880 880 0 0 0-3.889 3.75c-.196.182-.213.45-.21.718L.017 6.57S1.743 4.892 4.32 2.41c1.39 3.615 2.837 7.21 4.263 10.813c.195.544-.272.99-.864 1.585c-.818.798-2.53 2.44-4.281 4.635h1.756l4.22-4.629c.402-.552.9-1.091.69-1.591L5.024 0Z"
          />
        </svg>
        <h1>Lista de materias</h1>
        <button
          onClick={handlerOpenCreateModal}
          className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
        >
          Nueva Materia
        </button>
      </div>
      <div className="overflow-x-auto bg-white text-black w-full h-[90%]">
        <table className="table w-full h-full">
          <thead className="[&>tr]:border-none">
            <tr>
              <th>ID</th>
              <th>Nombre de la materia</th>
              <th>Profesor</th>
              <th>Curso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-none">
            {subjects.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-teal-500 hover:text-white cursor-pointer transition duration-500"
              >
                <th>{index + 1}</th>
                <td>{item.nombre}</td>
                <td>
                  {" "}
                  {item.profesor && item.profesor.nombre}{" "}
                  {item.profesor && item.profesor.apellido}
                </td>
                <td className="text-center">
                  {item.curso ? item.curso.nombre_curso : "-"}
                </td>

                <td>
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
                      onClick={() => handlerOpenDeleteModal(item.materia_id)}
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
      <input type="checkbox" ref={modalRef} className="modal-toggle" />
      <Modal>
        <div className="h-[10%]">
          <h3 className="text-center font-bold text-lg text-[#009688]">
            Nueva materia
          </h3>
        </div>
        <div className="overflow-x-auto h-[90%] p-1">
          <form action={type ? handlerCreate : handlerUpdate}>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Nombre de la materia</span>
              </div>
              <input
                required
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la materia"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-black text-sm">Curso</span>
              </div>
              <select
                required
                name="course"
                onChange={({ target }) => {
                  setCourse(Number(target.value));
                }}
                value={course ? course : "Selecciona un curso"}
                className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              >
                <option disabled>Selecciona un curso</option>
                {courses.map((course, index) => (
                  <option key={index} value={course.curso_id}>
                    {course.nombre_curso}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-black text-sm">Profesor</span>
              </div>
              <select
                required
                name="teacher"
                onChange={({ target }) => {
                  setTeacher(Number(target.value));
                }}
                value={teacher ? teacher : "Selecciona un profesor"}
                className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500 text-black"
              >
                <option disabled>Selecciona un profesor</option>
                {teachers.map((teacher, index) => (
                  <option
                    key={index}
                    className="text-black"
                    value={teacher.profesor_id}
                  >
                    {teacher.nombre} {teacher.apellido}
                  </option>
                ))}
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
