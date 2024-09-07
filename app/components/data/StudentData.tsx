"use client";
import { generateStudentReport } from "@/app/dashboard/alumnos/lib/actions";
import { ModalComponent } from "@/app/dashboard/components/Modal";
import {
  generateReportPayment,
  updatePayment,
} from "@/app/lib/payments/actions";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export const StudentData = ({ student, payments }: any) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false)
  const [payment, setPayment] = useState({
    id: 0,
    ref: "",
    cost: 0,
    modality: "",
    name: "",
    lastName: "",
    email: "",
  });
  const [state, action] = useFormState(generateStudentReport, undefined);
  const [stateP, actionP] = useFormState(generateReportPayment, undefined);

  useEffect(() => {
    if (state?.data) {
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${state.data}`;
      link.download = "report.pdf";
      link.click();
    }
  }, [state]);
  useEffect(() => {
    if (stateP?.data) {
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${stateP.data}`;
      link.download = "factura_pago.pdf";
      link.click();
    }
  }, [stateP]);
  const handlerOpenCreateModal = (item: any) => {
    setPayment({ ...payment, id: item.pago_id, cost: item.monto });
    setOpen(!open)
  };
  const handlerCloseModal = () => {
    setOpen(!open)
  };
  const handlerUpdate = (formData: FormData) => {
    const updatePaymentWithId = updatePayment.bind(null, payment.id);
    updatePaymentWithId(formData);
    setOpen(!open)
  };
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = '/solvencia.docx';
    link.download = 'solvencia_academica.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <div className="w-full p-5">
        <div className="card bg-white p-5 gap-3">
          <div className="border-b pb-3 border-slate-300 flex justify-between items-center">
            <h1 className="text-black">Información personal</h1>
            <button
              onClick={downloadPDF}
              className="btn btn-sm bg-[#009688] hover:bg-teal-500 hover:scale-110 transition duration-500 text-white border-none"
            >
              Descargar solvencia academica
            </button>
          </div>
          <div className="w-full grid grid-cols-2">
            <div>
              <h3 className="font-semibold">Nombre y apellido:</h3>
              <p className="text-black">
                {student?.nombre} {student?.apellido}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Usuario:</h3>
              <p className="text-black">{student?.usuarios.usuario}</p>
            </div>
            <div>
              <h3 className="font-semibold">Edad:</h3>
              <p className="text-black">{student?.edad}</p>
            </div>
            <div>
              <h3 className="font-semibold">Correo:</h3>
              <p className="text-black">{student?.correo}</p>
            </div>
            <div>
              <h3 className="font-semibold">Telefono:</h3>
              <p className="text-black">{student?.telefono}</p>
            </div>
            <div>
              <h3 className="font-semibold">Cedula:</h3>
              <p className="text-black">{student?.cedula}</p>
            </div>
            <div>
              <h3 className="font-bold">Estatus:</h3>
              <p className="text-black">{student?.estatus}</p>
            </div>
          </div>
        </div>
        <br />
        <div className="card bg-white p-5 gap-3">
          <div className="border-b pb-3 border-slate-300">
            <h3>Inscripciones</h3>
          </div>
          {student.inscripcion.length > 0 ? (
            <div className="grid grid-cols-3 gap-5">
              {student.inscripcion.map((i: any, index: number) => (
                <div key={index} className="card border p-5">
                  <h3>{i.curso.nombre_curso}</h3>
                  <p>
                    Estatus:{" "}
                    {i.estatus == "activo"  && (
                      <span className="badge bg-green-500 text-white border-none">
                        Activo
                      </span>
                    )}
                    {i.estatus == "inactivo" && (
                      <span className="badge bg-red-500 text-white border-none">
                        Activo
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-black text-center">
              Parece que todavia no tienes inscripciones
            </h1>
          )}
        </div>
        <br />
        <div className="card bg-white p-5 gap-3">
          <div className="border-b pb-3 border-slate-300 flex justify-between items-center">
            <h3>Notas</h3>
            {student.materia_estudiante.length > 0 && (
              <form action={action}>
                <button
                  type="submit"
                  className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
                >
                  Generar reporte de notas
                </button>
              </form>
            )}
          </div>
          {student.materia_estudiante.length > 0 ? (
            <div className="grid grid-cols-3 gap-5">
              {student.materia_estudiante.map((i: any, index: number) => (
                <div key={index} className="card border p-5">
                  <h3>Nota:{i.nota}</h3>
                  <p>Materia: {i.materia.nombre}</p>
                  <p>Curso: {i.materia.curso.nombre_curso}</p>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-black text-center">
              Parece que todavia no tienes notas
            </h1>
          )}
        </div>
        <br />
        <div className="card bg-white p-5 gap-3">
          <div className="border-b pb-3 border-slate-300">
            <h3>Pagos pendientes</h3>
          </div>
          {payments.length > 0 ? (
            <div className="grid grid-cols-3 gap-5">
              {payments.map((i: any, index: number) => (
                <div key={index} className="card border p-5">
                  <h3>
                    Cantidad: <span className="text-xl">${i.monto}</span>
                  </h3>
                  <p>Curso: {i.inscripcion.curso.nombre_curso}</p>
                  <p>
                    Estatus:{" "}
                    {i.estatus == "Pagado" && (
                      <span className="badge bg-green-500 text-white border-none">
                        Pagado
                      </span>
                    )}
                    {i.estatus == "Pendiente" && (
                      <span className="badge badge-warning text-white border-none">
                        Pendiente
                      </span>
                    )}
                    {i.estatus == "Procesando" && (
                      <span className="badge badge-warning text-white border-none">
                        Procesando
                      </span>
                    )}
                    {i.estatus == "Rechazado" && (
                      <span className="badge bg-red-500 text-white border-none">
                        Rechazado
                      </span>
                    )}
                  </p>
                  <br />
                  {i.estatus === "Pendiente" && (
                    <button
                      onClick={() => handlerOpenCreateModal(i)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
                    >
                      Pagar
                    </button>
                  )}
                  {i.estatus === "Pagado" && (
                    <button
                      onClick={() => actionP(i.pago_id)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-400 border-none hover:scale-105 transition duration-300 text-white max-w-xs"
                    >
                      Descargar factura
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-black text-center">
              Parece que todavia no tienes pagos
            </h1>
          )}
        </div>
      </div>
      <ModalComponent open={open}>
        <div className="h-[10%]">
          <h3 className="text-center font-bold text-lg text-[#009688]">
            Realizar pago
          </h3>
        </div>
        <div className="overflow-x-auto h-[90%] p-2">
          <form action={handlerUpdate}>
            <div className="flex items-center gap-5">
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
                  onChange={(e) =>
                    setPayment({ ...payment, [e.target.name]: e.target.value })
                  }
                  value={payment.name}
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
                  onChange={(e) =>
                    setPayment({ ...payment, [e.target.name]: e.target.value })
                  }
                  value={payment.lastName}
                />
              </label>
            </div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Correo electronico</span>
              </div>
              <input
                required
                name="email"
                type="text"
                placeholder="Correo electronico"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) =>
                  setPayment({ ...payment, [e.target.name]: e.target.value })
                }
                value={payment.email}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Id de referencia</span>
              </div>
              <input
                required
                name="ref"
                type="text"
                placeholder="id"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                onChange={(e) =>
                  setPayment({ ...payment, [e.target.name]: e.target.value })
                }
                value={payment.ref}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Costo</span>
              </div>
              <input
                name="monto"
                type="number"
                placeholder="Costo"
                className="input input-sm input-bordered w-full bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
                readOnly
                value={payment.cost}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-black text-sm">Modalidad de pago</span>
              </div>
              <select
                name="modality"
                value={payment.modality}
                onChange={(e) =>
                  setPayment({ ...payment, [e.target.name]: e.target.value })
                }
                className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              >
                <option value={"Pago movil"}>Pago movil</option>
                <option value={"Transferencia"}>Transferencia</option>
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
      </ModalComponent>
    </div>
  );
};
