"use client";
import { FormState, createTeacherAction } from "@/app/lib/teacher/actions";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
    >
      {pending && <span className="loading loading-spinner loading-xs"></span>}
      Agregar profesor
    </button>
  );
};
export const TeacherForm = () => {
  const [user, setUser] = useState<{
    user: string;
    password: string;
    rol: number;
  }>({
    user: "",
    password: "",
    rol: 3,
  });
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
  const [state, action] = useFormState<FormState, FormData>(createTeacherAction, undefined);

  const handlerSetTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  const handlerSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full card bg-white p-5">
      <form action={action} className="grid grid-cols-2 gap-5">
        <label className="form-control w-full text-black">
          <div className="label">
            <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
              Usuario
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              name="user"
              onChange={handlerSetUser}
              required
              type="text"
              className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
              placeholder="Usuario"
              value={user.user}
            />
          </div>
        </label>
        <label className="form-control w-full text-black">
          <div className="label">
            <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
              Contraseña
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              name="password"
              onChange={handlerSetUser}
              required
              type="text"
              className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
              placeholder="Contraseña"
              value={user.password}
            />
          </div>
        </label>
        <div className="col-span-2">
          <h2> Datos del profesor</h2>
        </div>
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
        <div className="col-span-2">
          <SubmmitButton />
        </div>
      </form>
      {state?.message && (
        <div role="alert" className="alert alert-success my-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.message}</span>
        </div>
      )}
      {state?.error && (
        <div role="alert" className="alert alert-error my-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.error}</span>
        </div>
      )}
    </div>
  );
};
