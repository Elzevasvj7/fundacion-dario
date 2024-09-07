import Image from "next/image";
import React from "react";
import { getCourses } from "../lib/course/actions";
import { getSession } from "../lib/actions";
import { Table, TableProps } from "antd";
import TablePagination from "./components/TablePagination";
import { prisma } from "../lib/prisma";

async function getStudents() {
  try {
    const data = await prisma.alumnos.findMany({ include: { usuarios: true } });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

export default async function Dashboard() {
  const session = await getSession();

  if (session.rol == "Estudiante") {
    const courses = await getCourses();
    const columns: TableProps<any>["columns"] = [
      {
        title: "ID del Curso",
        dataIndex: "curso_id",
        key: "curso_id",
        render: (_, record) => <div>{record.curso_id}</div>,
      },
      {
        title: "Nombre del Curso",
        dataIndex: "nombre_curso",
        key: "nombre_curso",
        render: (_, record) => <div>{record.nombre_curso}</div>,
      },
      {
        title: "Costo",
        dataIndex: "monto",
        key: "monto",
        render: (_, record) => <div>{record.monto?.toFixed(2)}</div>,
      },
      {
        title: "Estatus",
        dataIndex: "estatus",
        key: "estatus",
        render: (_, record) => <div>{record.estatus}</div>,
      },
    ];
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={"/school.svg"}
          alt=""
          width={100}
          height={100}
          className="h-auto w-2/3"
        />
        {/* Calendarios */}
        {/* <Table dataSource={cursos} columns={columns} /> */}
      </div>
    );
  }
  if (session.rol == "Administrador") {
    const courses = await getCourses();
    const students = await getStudents();
    const payments = await getCourses();
    const columns: TableProps<any>["columns"] = [
      {
        title: "ID del Curso",
        dataIndex: "curso_id",
        key: "curso_id",
      },
      {
        title: "Nombre del Curso",
        dataIndex: "nombre_curso",
        key: "nombre_curso",
      },
      {
        title: "Costo",
        dataIndex: "monto",
        key: "monto",
      },
      {
        title: "Estatus",
        dataIndex: "estatus",
        key: "estatus",
      },
    ];
    const columnsStudent: TableProps<any>["columns"] = [
      {
        title: "ID",
        dataIndex: "alumno_id",
        key: "alumno_id",
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Apellido",
        dataIndex: "apellido",
        key: "apellido",
      },
      {
        title: "Código",
        dataIndex: "codigo",
        key: "codigo",
      },
      {
        title: "Edad",
        dataIndex: "edad",
        key: "edad",
      },
      {
        title: "Dirección",
        dataIndex: "direccion",
        key: "direccion",
      },
      {
        title: "Cédula",
        dataIndex: "cedula",
        key: "cedula",
      },
      {
        title: "Teléfono",
        dataIndex: "telefono",
        key: "telefono",
      },
      {
        title: "Correo",
        dataIndex: "correo",
        key: "correo",
      },
      {
        title: "Fecha de Nacimiento",
        dataIndex: "fecha_nac",
        key: "fecha_nac",
      },
      {
        title: "Estatus",
        dataIndex: "estatus",
        key: "estatus",
      },
    ];
    const columnspayments = [
      {
        title: "Monto",
        dataIndex: "monto",
        key: "monto",
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Apellido",
        dataIndex: "apellido",
        key: "apellido",
      },
      {
        title: "Correo",
        dataIndex: "correo",
        key: "correo",
      },
      {
        title: "Referencia",
        dataIndex: "ref",
        key: "ref",
      },
      {
        title: "Modalidad",
        dataIndex: "modalidad",
        key: "modalidad",
      },
      {
        title: "Estatus",
        dataIndex: "estatus",
        key: "estatus",
      },
      {
        title: "Fecha de Pago",
        dataIndex: "fecha_pago",
        key: "fecha_pago",
      }
    ];
    return (
      <div className="w-full h-full grid grid-cols-2 gap-5 p-5">
        {/* Calendarios, Pagos, Estudiantes  */}
        <div className="w-full bg-white p-5 rounded">
          <h2>Cursos</h2>
          <TablePagination data={courses} columns={columns} />
        </div>
        <div className="w-full bg-white p-5 rounded">
          <h2>Estudiantes</h2>
          <TablePagination
            data={students}
            columns={columnsStudent}
            scroll={{ x: 1300 }}
          />
        </div>
        <div className="w-full bg-white p-5 rounded">
          <h2>Pagos</h2>
          <TablePagination data={payments} columns={columnspayments} />
        </div>
      </div>
    );
  }
  if (session.rol == "Secretario") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={"/school.svg"}
          alt=""
          width={100}
          height={100}
          className="h-auto w-2/3"
        />
        {/*Pagos, Estudiantes */}
      </div>
    );
  }
}
