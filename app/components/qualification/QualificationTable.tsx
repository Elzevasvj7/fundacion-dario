"use client";
import {
  FormState,
  qualificatationSubjectStudent,
} from "@/app/lib/subjects/actions";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
      type="submit"
    >
      {pending && <span className="loading loading-spinner loading-md"></span>}
      Guardar notas
    </button>
  );
};

export const QualificationTable = ({ q, subject, teacher }: any) => {
  const [qualys, setQualy] = useState(q);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handlerUpdateQualy = (qualyId: number, newQualy: number) => {
    setQualy(
      qualys.map((qualy: any) => {
        if (qualy.materia_est_id === qualyId) {
          return { ...qualy, nota: newQualy };
        } else {
          return qualy;
        }
      })
    );
  };
  const updateQualys = async (
    state: FormState,
    {
      materia,
      profesor,
      grades,
    }: {
      materia: number;
      profesor: number;
      grades: { materia_est_id: number; alumno_id: number; nota: number }[];
    }
  ): Promise<FormState> => {
    setSuccess(false);
    const formRequest = qualificatationSubjectStudent(state, {
      materia,
      profesor,
      grades,
    });
    return formRequest;
  };
  const [state, action] = useFormState(
    qualificatationSubjectStudent,
    undefined
  );
  useEffect(() => {
    if (state?.message) {
      setSuccess(true);
    }
    if (state?.error) {
      setError(true);
    }
  }, [state]);
  return (
    <div>
      <div className="card bg-white p-5">
        <div className="border-b pb-3 border-slate-300">
          <h1 className="text-black">Calificar materia: {subject.nombre}</h1>
        </div>

        <div className="overflow-x-auto bg-white text-black w-full h-[90%]">
          <table className="table w-full h-full">
            <thead className="[&>tr]:border-none">
              <tr>
                <th></th>
                <th>Alumno</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-none">
              {qualys.map((c: any, index: any) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    {c.alumnos?.nombre} {c.alumnos?.apellido}
                  </td>
                  <td>
                    <div className="max-w-20">
                      {edit ? (
                        <input
                          onChange={(e) =>
                            handlerUpdateQualy(
                              c.materia_est_id,
                              parseInt(e.target.value)
                            )
                          }
                          required
                          value={c.nota ? c.nota : 0}
                          type="number"
                          max={20}
                          className="input input-sm w-full input-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                        />
                      ) : (
                        <div className="w-full">{c.nota}</div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div className="flex items-center gap-5">
          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
            >
              Calificar
            </button>
          )}
          {edit && (
            <button
              onClick={() => {
                setSuccess(false);
                setError(false);
                setEdit(false);
              }}
              className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
            >
              Volver
            </button>
          )}
          {edit && (
            <form
              action={() =>
                action({
                  materia: parseInt(subject.materia_id),
                  profesor: parseInt(teacher),
                  grades: qualys,
                })
              }
            >
              <SubmmitButton />
            </form>
          )}
        </div>
      </div>
      {success && edit && (
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
          <span>{state?.message}</span>
        </div>
      )}
      {error && edit && (
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
          <span>{state?.error}</span>
        </div>
      )}
    </div>
  );
};
