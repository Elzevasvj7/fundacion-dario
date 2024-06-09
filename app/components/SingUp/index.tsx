"use client";
import { FormState, signUp } from "@/app/lib/actions";
import { createEnrollment } from "@/app/lib/enrollment/actions";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn bg-[#153744] hover:bg-[#336666] w-full max-w-xs border-none transition duration-500 text-white"
    >
      {pending && <span className="loading loading-spinner loading-xs"></span>}
      Registrarse
    </button>
  );
};

const SingUp = () => {
  const [user, setUser] = useState<{
    user: string;
    password: string;
    rol: number;
  }>({
    user: "",
    password: "",
    rol: 3,
  });
  const [student, setStudent] = useState<{
    name: string;
    lastName: string;
    age: number | undefined;
    address: string;
    cedula: string;
    phone: string;
    email: string;
    fecha_nac: string;
    status: number;
  }>({
    name: "",
    lastName: "",
    age: 0,
    address: "",
    cedula: "",
    phone: "",
    email: "",
    fecha_nac: "",
    status: 1,
  });
  const handlerSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlerSetStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const [state, action] = useFormState<FormState, FormData>(signUp, undefined);

  return (
    <div className="w-full card bg-white p-5">
      <div className="my-5">
        <h1 className="text-center font-semibold text-3xl text-[#336666]">
          Crear nueva cuenta
        </h1>
      </div>
      <form
        action={action}
        className=" card bg-transparent text-neutral-content border-2 border-[#336666]"
      >
        <div className="grid grid-cols-2 gap-3 card-body items-center text-center p-5">
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
          <label className="form-control w-full text-black">
            <div className="label">
              <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
                Nombre
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="name"
                onChange={handlerSetStudent}
                required
                type="text"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
                placeholder="Nombre"
                value={student.name}
              />
            </div>
          </label>
          <label className="form-control w-full text-black">
            <div className="label">
              <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
                Apellido
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="lastName"
                onChange={handlerSetStudent}
                required
                type="text"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
                placeholder="Apellido"
                value={student.lastName}
              />
            </div>
          </label>
          <label className="form-control w-full text-black">
            <div className="label">
              <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
                Edad
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="age"
                onChange={handlerSetStudent}
                required
                type="number"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
                placeholder="Edad"
                value={student.age}
              />
            </div>
          </label>
          <label className="form-control w-full text-black">
            <div className="label">
              <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
                Direccion
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="address"
                onChange={handlerSetStudent}
                required
                type="text"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
                placeholder="Direccion"
                value={student.address}
              />
            </div>
          </label>
          <label className="form-control w-full text-black">
            <div className="label">
              <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
                Cedula
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="cedula"
                onChange={handlerSetStudent}
                required
                type="text"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
                placeholder="Cedula"
                value={student.cedula}
              />
            </div>
          </label>
          <label className="form-control w-full text-black">
            <div className="label">
              <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
                Telefono
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="phone"
                onChange={handlerSetStudent}
                required
                type="text"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
                placeholder="Telefeono"
                value={student.phone}
              />
            </div>
          </label>
          <label className="form-control w-full text-black">
            <div className="label">
              <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
                Correo
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="email"
                onChange={handlerSetStudent}
                required
                type="text"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
                placeholder="Correo"
                value={student.email}
              />
            </div>
          </label>
          <div className="col-span-2 flex justify-center items-center">
            <SubmmitButton />
          </div>
          {state?.message && (
            <p className="text-red-500 text-center text-sm">{state.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SingUp;
