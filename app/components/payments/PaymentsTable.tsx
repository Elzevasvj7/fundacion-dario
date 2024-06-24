"use client";
import { Modal } from "@/app/dashboard/components/Modal";
import {
  generateReportPayment,
  updatePayment,
  updatePaymentAdmin,
} from "@/app/lib/payments/actions";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export const PaymentsTable = ({ payments }: { payments: any[] }) => {
  const deleteModal = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLInputElement>(null);
  const [payment, setPayment] = useState({
    id: 0,
    ref: "",
    cost: 0,
    modality: "",
    name: "",
    lastName: "",
    email: "",
    status: "",
  });

  const handlerOpenCreateModal = (item: any) => {
    setPayment({
      ...payment,
      id: item.pago_id,
      cost: item.monto,
      ref: item.ref,
      modality: item.modalidad,
      name: item.nombre,
      lastName: item.apellido,
      email: item.email,
    });
    modalRef.current?.click();
  };
  const handlerCloseModal = () => {
    modalRef.current?.click();
  };
  const handlerUpdate = (formData: FormData) => {
    const updatePaymentWithId = updatePaymentAdmin.bind(null, payment.id);
    updatePaymentWithId(formData);
    modalRef.current?.click();
  };
  const [state, action] = useFormState(generateReportPayment, undefined);
  useEffect(() => {
    if (state?.data) {
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${state.data}`;
      link.download = "report.pdf";
      link.click();
    }
  }, [state]);
  return (
    <div className="w-full">
      <div className="w-full mb-5 bg-white text-black p-5 flex items-center gap-2 h-[10%]">
        <h1>Lista de pagos</h1>
      </div>
      <div className="overflow-x-auto bg-white text-black w-full h-[90%]">
        <table className="table w-full h-full">
          <thead className="[&>tr]:border-none">
            <tr>
              <th></th>
              <th>Monto</th>
              <th>Curso</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-none">
            {payments.map((item: any, index: any) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>${item.monto}</th>
                <td>{item.inscripcion.curso?.nombre_curso}</td>
                <td>
                  {item.estatus == "Pagado" && (
                    <span className="badge bg-green-500 text-white border-none">
                      Pagado
                    </span>
                  )}
                  {item.estatus == "Pendiente" && (
                    <span className="badge badge-warning text-white border-none">
                      Pendiente
                    </span>
                  )}
                  {item.estatus == "Procesando" && (
                    <span className="badge badge-warning text-white border-none">
                      Procesando
                    </span>
                  )}
                  {item.estatus == "Rechazado" && (
                    <span className="badge bg-red-500 text-white border-none">
                      Rechazado
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex gap-5 items-center">
                    <button
                      onClick={() => handlerOpenCreateModal(item)}
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
                    {item.estatus == "Pagado" && (
                      <form action={() => action(item.pago_id)}>
                        <button className="btn btn-sm bg-[#009688] hover:bg-[#009688] border-none hover:scale-110 transition duration-300 text-white">
                          Descargar factura
                        </button>
                      </form>
                    )}
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
            Datos del pago
          </h3>
        </div>
        <div className="overflow-x-auto h-[90%] p-2">
          <form action={handlerUpdate}>
            <div className="flex items-center gap-5">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="text-black text-sm">Nombre</span>
                </div>
                <p>{payment.name}</p>
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="text-black text-sm">Apellido</span>
                </div>
                <p>{payment.lastName}</p>
              </label>
            </div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Correo electronico</span>
              </div>
              <p>{payment.email}</p>
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Id de referencia</span>
              </div>
              <p>{payment.ref}</p>
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-black text-sm">Costo</span>
              </div>
              <p>{payment.cost}</p>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-black text-sm">Modalidad de pago</span>
              </div>
              <p>{payment.modality}</p>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-black text-sm">Estatus</span>
              </div>
              <select
                name="status"
                value={payment.status}
                onChange={(e) =>
                  setPayment({ ...payment, [e.target.name]: e.target.value })
                }
                className="select select-sm select-bordered bg-transparent focus:outline-none focus:border-[#009688] transition duration-500"
              >
                <option value={"Pagado"}>Pagado</option>
                <option value={"Rechazado"}>Rechazado</option>
                <option value={"Pendiente"}>Pendiente</option>
                <option value={"Procesando"}>Pendiente</option>
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
    </div>
  );
};
