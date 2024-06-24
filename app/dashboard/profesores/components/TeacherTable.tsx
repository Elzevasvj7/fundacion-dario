"use client";
import React, { useRef, useState } from "react";
import { Modal } from "../../components/Modal";
import { createTeacher, deleteTeacher, updateTeacher } from "../lib/teacher";
import Link from "next/link";

const TeacherTable = ({ profesores }: { profesores: any[] }) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const deleteModal = useRef<HTMLDialogElement>(null);
  const [type, setType] = useState(false);
  const [teacher, setTeacher] = useState<{
    id: number;
    name: string | undefined;
    lastName: string | undefined;
    address: string | undefined;
    cedula: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    level_est: string | undefined;
  }>({
    id: 0,
    name: "",
    lastName: "",
    address: "",
    cedula: "",
    phone: "",
    email: "",
    level_est: "",
  });
  const handlerSetTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  const handlerOpenCreateModal = () => {
    setType(true);
    modalRef.current?.click();
  };
  const handlerOpenUpdateModal = (teacher: {
    profesor_id: number;
    nombre?: string;
    apellido?: string;
    direccion?: string;
    cedula?: string;
    telefono?: string;
    correo?: string;
    nivel_est?: string;
  }) => {
    setTeacher({
      id: teacher.profesor_id,
      name: teacher.nombre,
      lastName: teacher.apellido,
      address: teacher.direccion,
      cedula: teacher.cedula,
      phone: teacher.telefono,
      email: teacher.correo,
      level_est: teacher.nivel_est,
    });
    setType(false);
    modalRef.current?.click();
  };
  const handlerOpenDeleteModal = (id: number) => {
    setTeacher({ ...teacher, id: id });
    deleteModal.current?.showModal();
  };
  const handlerCloseModal = () => {
    setTeacher({
      id: 0,
      name: "",
      lastName: "",
      address: "",
      cedula: "",
      phone: "",
      email: "",
      level_est: "",
    });
    modalRef.current?.click();
  };

  const handlerCreate = (formData: FormData) => {
    createTeacher(formData).then(() => {
      handlerCloseModal();
    });
  };
  const handlerUpdate = (formData: FormData) => {
    const updateUserWithId = updateTeacher.bind(null, teacher.id);
    updateUserWithId(formData).then(() => {
      handlerCloseModal();
    });
  };
  const handlerDelete = () => {
    const deleteUserWithId = deleteTeacher.bind(null, teacher.id);
    deleteUserWithId().then(() => {
      deleteModal.current?.close();
    });
  };
  return (
    <div className="w-full">
      <div className="w-full mb-5 bg-white text-black p-5 flex items-center gap-2 h-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 640 512"
        >
          <path
            fill="#000"
            d="M160 64c0-35.3 28.7-64 64-64h352c35.3 0 64 28.7 64 64v288c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384v-32c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64H224v49.1C205.2 102.2 183.3 96 160 96zm0 64a96 96 0 1 1 0 192a96 96 0 1 1 0-192m-26.7 224h53.3c73.7 0 133.4 59.7 133.4 133.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352"
          />
        </svg>
        <h1>Lista de profesores</h1>
        <Link
          href={"/dashboard/profesores/crear"}
          className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
        >
          Nuevo
        </Link>
      </div>
      <div className="overflow-x-auto bg-white text-black w-full h-[90%]">
        <table className="table w-full h-full">
          <thead className="[&>tr]:border-none">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Direccion</th>
              <th>Cedula</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Nivel de Est.</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-none">
            {profesores.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-teal-500 hover:text-white cursor-pointer transition duration-500"
              >
                <th>{index + 1}</th>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.direccion}</td>
                <td>{item.cedula}</td>
                <td>{item.telefono}</td>
                <td>{item.correo}</td>
                <td>{item.nivel_est}</td>
                <td>
                  <span className="badge bg-green-500 text-white border-none">
                    Activo
                  </span>
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
                      onClick={() => handlerOpenDeleteModal(item.profesor_id)}
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
            Nuevo Profesor
          </h3>
        </div>
        <div className="overflow-x-auto h-[90%] p-1">
          <form action={type ? handlerCreate : handlerUpdate}>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Nombre</span>
              </div>
              <input
                required
                onChange={handlerSetTeacher}
                name="name"
                value={teacher.name}
                type="text"
                placeholder="Nombre"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Apellido</span>
              </div>
              <input
                required
                onChange={handlerSetTeacher}
                name="lastName"
                value={teacher.lastName}
                type="text"
                placeholder="Apellido"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Direccion</span>
              </div>
              <input
                onChange={handlerSetTeacher}
                name="address"
                value={teacher.address}
                type="text"
                placeholder="Direccion"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Cedula</span>
              </div>
              <input
                required
                onChange={handlerSetTeacher}
                name="cedula"
                value={teacher.cedula}
                type="text"
                placeholder="Cedula"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Telefono</span>
              </div>
              <input
                onChange={handlerSetTeacher}
                name="phone"
                value={teacher.phone}
                type="number"
                placeholder="Telefono"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Correo</span>
              </div>
              <input
                required
                onChange={handlerSetTeacher}
                name="email"
                value={teacher.email}
                type="email"
                placeholder="Correo"
                className="input input-sm input-bordered w-full bg-transparent  focus:outline-none focus:border-[#009688] transition duration-500"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Nivel de Estudio</span>
              </div>
              <input
                required
                onChange={handlerSetTeacher}
                name="level_est"
                value={teacher.level_est}
                type="text"
                placeholder="Nivel de Estudio"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-black text-sm">Estado</span>
              </div>
              <select className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500">
                <option>Activo</option>
                <option>Inactivo</option>
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
            ¿Seguro que quieres eliminar este profesor?
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
export default TeacherTable;
