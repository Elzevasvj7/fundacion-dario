"use client";
import React, { useRef } from "react";
import { Modal } from "../components/Modal";

const alumnos = [
  {
    id: 1,
    nombre: "Juan Pérez",
    usuario: "juanperez",
    rol: "Estudiante",
  },
  {
    id: 2,
    nombre: "María García",
    usuario: "mariagarcia",
    rol: "Estudiante",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    usuario: "carlosrodriguez",
    rol: "Estudiante",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    usuario: "anamartinez",
    rol: "Estudiante",
  },
  {
    id: 5,
    nombre: "Pedro López",
    usuario: "pedrolopez",
    rol: "Estudiante",
  },
  {
    id: 6,
    nombre: "Laura Sánchez",
    usuario: "laurasanchez",
    rol: "Estudiante",
  },
  {
    id: 7,
    nombre: "Sara González",
    usuario: "saragonzalez",
    rol: "Estudiante",
  },
  {
    id: 8,
    nombre: "Miguel Fernández",
    usuario: "miguelfernandez",
    rol: "Estudiante",
  },
  {
    id: 9,
    nombre: "Elena Ruiz",
    usuario: "elenaruiz",
    rol: "Estudiante",
  },
  {
    id: 10,
    nombre: "David Jiménez",
    usuario: "davidjimenez",
    rol: "Estudiante",
  },
];

const Users = () => {
  const modalRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-full flex flex-col items-center justify-start w-full p-5 bg">
      <div className="w-full mb-5 bg-white text-black p-5 flex items-center gap-2 h-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 640 512"
        >
          <path
            fill="#000"
            d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4"
          />
        </svg>
        <h1>Lista de usuarios</h1>
        <button
          onClick={() => modalRef.current?.click()}
          className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
        >
          Nuevo
        </button>
      </div>
      <div className="overflow-x-auto bg-white text-black w-full h-[90%]">
        <table className="table w-full h-full">
          <thead className="[&>tr]:border-none">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-none">
            {alumnos.map((item, index) => (
              <tr key={index} className="hover:bg-teal-500 hover:text-white cursor-pointer transition duration-500">
                <th>{item.id}</th>
                <td>{item.nombre}</td>
                <td>{item.usuario}</td>
                <td>{item.rol}</td>
                <td>
                  <span className="badge bg-green-500 text-white border-none">
                    Activo
                  </span>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <button className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-110 transition duration-300">
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
                    <button className="btn btn-sm bg-red-500 border-none hover:bg-red-600 hover:scale-110 transition duration-300">
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
            Nuevo Usuario
          </h3>
        </div>
        <div className="overflow-x-auto h-[90%] p-1">
          <label className="form-control w-full ">
            <div className="label">
              <span className="text-black text-sm">Nombre</span>
            </div>
            <input
              type="text"
              placeholder="Nombre"
              className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="text-black text-sm">Usuario</span>
            </div>
            <input
              type="text"
              placeholder="Usuario"
              className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="text-black text-sm ">Contraseña</span>
            </div>
            <input
              type="Contraseña"
              placeholder="Contraseña"
              className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="text-black text-sm">Rol</span>
            </div>
            <select className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500">
              <option>Administrador</option>
              <option>Asistente</option>
            </select>
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
            <label className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none">
              Guardar
            </label>
            <label
              onClick={() => modalRef.current?.click()}
              className="btn btn-sm rounded-sm bg-red-500 hover:bg-red-600 hover:scale-110 transition duration-500 text-white border-none"
            >
              Cancelar
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
