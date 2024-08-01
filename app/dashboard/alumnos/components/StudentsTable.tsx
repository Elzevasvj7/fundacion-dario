"use client";
import React, { useRef, useState } from "react";
import { Modal } from "../../components/Modal";
import { createStudent, deleteStudent, updateStudent } from "../lib/actions";
import Link from "next/link";

const StudentsTable = ({ alumnos }: { alumnos: any[] }) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const deleteModal = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [cedula, setCedula] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState(0);
  const [type, setType] = useState(false);

  const handlerOpenCreateModal = () => {
    setType(true);
    modalRef.current?.click();
  };
  const handlerOpenUpdateModal = (alumno: {
    alumno_id: number;
    nombre: string;
    apellido: string;
    edad: number;
    direccion: string;
    cedula: string;
    telefono: string;
    correo: string;
    fecha_nac: string;
    codigo: string;
  }) => {
    setUserId(alumno.alumno_id);
    setName(alumno.nombre);
    setLastName(alumno.apellido);
    setAge(alumno.edad);
    setAddress(alumno.direccion);
    setCedula(alumno.cedula);
    setPhone(alumno.telefono);
    setEmail(alumno.correo);
    setBirthDate(alumno.fecha_nac);
    setCode(alumno.codigo);
    setType(false);
    modalRef.current?.click();
  };
  const handlerOpenDeleteModal = (id: number) => {
    setUserId(id);
    deleteModal.current?.showModal();
  };
  const handlerCloseModal = () => {
    setUserId(0);
    setName("");
    setLastName("");
    setAge(0);
    setAddress("");
    setCedula("");
    setPhone("");
    setEmail("");
    setBirthDate("");
    modalRef.current?.click();
  };

  const handlerCreate = (formData: FormData) => {
    createStudent(formData);
    modalRef.current?.click();
  };
  const handlerUpdate = (formData: FormData) => {
    const updateUserWithId = updateStudent.bind(null, userId);
    updateUserWithId(formData);
    modalRef.current?.click();
  };
  const handlerDelete = () => {
    const deleteUserWithId = deleteStudent.bind(null, userId);
    deleteUserWithId();
    deleteModal.current?.close();
  };
  return (
    <div>
      <div className="w-full mb-5 card bg-white text-black p-5 flex flex-row   items-center gap-2 h-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#000"
            d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4l.11-.94L5 5.5L12 2l7 3.5v5h-1V6l-2.11 1.06zm-4 6c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
          />
        </svg>
        <h1>Lista de alumnos</h1>
        <Link
          href={"/dashboard/inscripciones/crear-inscripcion"}
          className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
        >
          Nuevo
        </Link>
      </div>
      <div className="overflow-x-auto card bg-white text-black w-full h-[90%]">
        <table className="table w-full h-full">
          <thead className="[&>tr]:border-none">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Direccion</th>
              <th>Cedula</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Fecha de Nac.</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-none">
            {alumnos.map(
              (
                item: {
                  alumno_id: number;
                  nombre: string;
                  apellido: string;
                  edad: number;
                  direccion: string;
                  cedula: string;
                  telefono: string;
                  correo: string;
                  fecha_nac: string;
                  usuarios: any;
                  codigo: string;
                },
                index
              ) => (
                <tr
                  key={index}
                  className="hover:bg-teal-500 hover:text-white cursor-pointer transition duration-500"
                >
                  <th>{item.codigo}</th>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.edad}</td>
                  <td>{item.direccion}</td>
                  <td>{item.cedula}</td>
                  <td>{item.telefono}</td>
                  <td>{item.correo}</td>
                  <td>{item.fecha_nac}</td>
                  <td>
                    <span className="badge bg-green-500 text-white border-none">
                      Activo
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() =>
                          handlerOpenUpdateModal({
                            alumno_id: item.alumno_id,
                            nombre: item.nombre,
                            apellido: item.apellido,
                            edad: item.edad,
                            direccion: item.direccion,
                            cedula: item.cedula,
                            telefono: item.telefono,
                            correo: item.correo,
                            fecha_nac: item.fecha_nac,
                            codigo: item.codigo,
                          })
                        }
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
                        onClick={() =>
                          handlerOpenDeleteModal(item.usuarios.user_id)
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
              )
            )}
          </tbody>
        </table>
      </div>
      <input type="checkbox" ref={modalRef} className="modal-toggle" />
      <Modal>
        <div className="h-[10%]">
          <h3 className="text-center font-bold text-lg text-[#009688]">
            Nuevo Alumno
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
                <span className="text-black text-sm">Apellido</span>
              </div>
              <input
                required
                name="lastName"
                type="text"
                placeholder="Apellido"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm ">Edad</span>
              </div>
              <input
                required
                name="age"
                type="number"
                placeholder="Edad"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setAge(Number(e.target.value))}
                value={age}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Direccion</span>
              </div>
              <input
                name="address"
                type="text"
                placeholder="Direccion"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Cedula</span>
              </div>
              <input
                required
                name="cedula"
                type="text"
                placeholder="Cedula"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setCedula(e.target.value)}
                value={cedula}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Telefono</span>
              </div>
              <input
                name="phone"
                type="number"
                placeholder="Telefono"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Correo</span>
              </div>
              <input
                required
                name="email"
                type="email"
                placeholder="Correo"
                className="input input-sm input-bordered w-full bg-transparent  focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Fecha de nacimiento</span>
              </div>
              <input
                name="birthdate"
                type="date"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Codigo academico</span>
              </div>
              <input
                name="code"
                type="text"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
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
            ¿Seguro que quieres eliminar este alumno?
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

export default StudentsTable;
