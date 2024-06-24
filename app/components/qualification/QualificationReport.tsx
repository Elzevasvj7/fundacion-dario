"use client";
import { generateReportCourses } from "@/app/lib/course/actions";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

export const QualificationReport = ({ courses }: any) => {
  const [state, action] = useFormState(generateReportCourses, undefined);
  useEffect(() => {
    if (state?.data) {
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${state.data}`;
      link.download = "report.pdf";
      link.click();
    }
  }, [state]);
  return (
    <div className="overflow-x-auto card bg-white text-black w-full h-[90%]">
      <table className="table w-full h-full">
        <thead className="[&>tr]:border-none">
          <tr>
            <th>ID</th>
            <th>Nombre del curso</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="[&>tr]:border-none">
          {courses.map((item: any, index: number) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{item.nombre_curso}</td>
              <td>
                <span className="badge bg-green-500 text-white border-none">
                  Activo
                </span>
              </td>
              <td>
                <form action={() => action(item.curso_id)}>
                  <button
                    className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-110 transition duration-300 text-white"
                    type="submit"
                  >
                    Generar reporte
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
