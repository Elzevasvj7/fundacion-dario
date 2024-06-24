import Link from "next/link";
import React from "react";

const Reports = () => {
  return (
    <div className="w-full text-black p-5 bg">
      <div className="card bg-white p-5 gap-3">
        <h1 className="text-black">Generar reportes</h1>
      </div>
      <br />
      <div className="card bg-white p-5 gap-3">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={"/dashboard/reportes/calificaciones"}
            className="card border p-5 transition duration-300 hover:border-[#009688]"
          >
            Calificaciones
          </Link>
          <Link
            href={"/dashboard/reportes/pagos"}
            className="card border p-5 transition duration-300 hover:border-[#009688]"
          >
            Pagos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reports;
