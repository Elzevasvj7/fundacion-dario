"use client";
import { createEnrollment } from "@/app/lib/enrollment/actions";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";

const SubmmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-sm rounded-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
    >
      {pending && <span className="loading loading-spinner loading-xs"></span>}
      Crear inscripcion
    </button>
  );
};

const EnrollmentForm = ({ courses }: { courses: any[] }) => {
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
  const [grade, setGrade] = useState(1);
  const [cicle, setCicle] = useState(1);
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const handlerSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlerSetStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({
    course: "",
  });
  const handlerCreateEnrollment = async (formData: FormData) => {
    const response: any = await createEnrollment(formData);
    if (response.data) {
      setData(response.data);
      setError(response.error);
    }
    if (response.error) {
      setData(response.data);
      setError(response.error);
    }
  };
  return (
    <div className="w-full card bg-white p-5">
      <h1 className="text-black">Crear inscripcion</h1>
      <br />
      <form action={handlerCreateEnrollment} className="grid grid-cols-2 gap-5">
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
          <h2> Datos del estudiante</h2>
        </div>
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
        {/* <label className="form-control w-full text-black">
          <div className="label">
            <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
              Fecha de nacimiento
            </span>
          </div>
          <div className="flex items-center gap-1">
            <input
              name="fecha_nac"
              onChange={handlerSetStudent}
              required
              type="date"
              className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
              placeholder="Fecha de nacimiento"
              value={student.fecha_nac}
            />
          </div>
        </label>
        <label className="form-control w-full text-black">
          <div className="label">
            <span className="label-text text-black after:content-['*'] after:ml-0.5 after:text-red-500">
              Estatus
            </span>
          </div>
          <div className="flex items-center gap-1">
            <input
              name="status"
              onChange={handlerSetStudent}
              required
              type="text"
              className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none focus:border-[#336666] transition duration-500"
              placeholder="Estadus"
              value={student.status}
            />
          </div>
        </label> */}
        <div className="col-span-2">
          <h2>Datos academicos</h2>
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="text-black text-sm after:text-red-500">
              Grado academico
            </span>
          </div>
          <select
            required
            name="grade"
            onChange={({ target }) => {
              setGrade(Number(target.value));
            }}
            value={grade ? grade : "Selecciona un grado"}
            className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
          >
            <option disabled>Selecciona un grado</option>
            <option value={1} className="text-black">
              Licenciatura
            </option>
            <option value={2} className="text-black">
              Magister
            </option>
            <option value={3} className="text-black">
              Doctorado
            </option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="text-black text-sm after:text-red-500">
              Ciclo academico
            </span>
          </div>
          <select
            required
            name="cicle"
            onChange={({ target }) => {
              setCicle(Number(target.value));
            }}
            value={cicle ? cicle : "Selecciona un ciclo"}
            className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
          >
            <option disabled>Selecciona un ciclo</option>
            <option value={1} className="text-black">
              Ciclo 1
            </option>
            <option value={2} className="text-black">
              Ciclo 2
            </option>
            <option value={3} className="text-black">
              Ciclo 3
            </option>
          </select>
        </label>
        <div className="col-span-2">
          <SubmmitButton />
        </div>
      </form>
      {data && (
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
          <span>Estudiante creado satisfactoriamente</span>
        </div>
      )}
      {error && (
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
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default EnrollmentForm;
