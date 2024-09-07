"use client";
import { FormState, signIn } from "@/app/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn bg-blue-500 hover:bg-blue-600 w-full border-none transition duration-500 text-white"
      disabled={pending}
      type="submit"
    >
      {pending && <span className="loading loading-spinner loading-md"></span>}
      Iniciar sesion
    </button>
  );
};

const SignIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [state, action] = useFormState<FormState, FormData>(signIn, undefined);
  return (
    <div>
      <div className="my-5">
        <h1 className="text-center font-semibold text-3xl text-white">
          Iniciar sesion
        </h1>
      </div>
      <form
        className="card w-96 bg-white text-neutral-content border-2 border-white"
        action={action}
      >
        <div className="card-body items-center text-center">
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
                name="username"
                onChange={(e) => setUser(e.target.value)}
                required
                type="text"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none transition duration-500"
                placeholder="Usuario"
                value={user}
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
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                className="input input-sm w-full input-bordered bg-transparent flex items-center gap-2 focus:outline-none transition duration-500"
                placeholder="Contraseña"
                value={password}
              />
            </div>
          </label>
          <div className="card-actions justify-end">
            <SubmmitButton />
          </div>
          {/* <div className="h-[2px] w-full my-1 bg-gray-200"/> */}
          {/* <div>
            <Link
              href={"/registro"}
              className="btn bg-[#153744] hover:bg-[#336666] w-full border-none transition duration-500 text-white"
            >
              <span className="text-sm">Crear una cuenta nueva</span>
            </Link>
          </div> */}
          <div>
            {state?.message && (
              <p className="text-red-500 text-sm">{state.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
