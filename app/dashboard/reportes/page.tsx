import React from "react";

const alumnos = [
  {
    id: 1,
    nombre: "Juan Pérez",
    usuario: "juanperez",
    rol: "Estudiante",
  },
  {
    id: 2,
    nombre: "María García",
    usuario: "mariagarcia",
    rol: "Estudiante",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    usuario: "carlosrodriguez",
    rol: "Estudiante",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    usuario: "anamartinez",
    rol: "Estudiante",
  },
  {
    id: 5,
    nombre: "Pedro López",
    usuario: "pedrolopez",
    rol: "Estudiante",
  },
  {
    id: 6,
    nombre: "Laura Sánchez",
    usuario: "laurasanchez",
    rol: "Estudiante",
  },
  {
    id: 7,
    nombre: "Sara González",
    usuario: "saragonzalez",
    rol: "Estudiante",
  },
  {
    id: 8,
    nombre: "Miguel Fernández",
    usuario: "miguelfernandez",
    rol: "Estudiante",
  },
  {
    id: 9,
    nombre: "Elena Ruiz",
    usuario: "elenaruiz",
    rol: "Estudiante",
  },
  {
    id: 10,
    nombre: "David Jiménez",
    usuario: "davidjimenez",
    rol: "Estudiante",
  },
];
const Reports = () => {
  return (
    <div className="h-full flex flex-col items-center justify-start w-full text-black p-5 bg">
      Reportes
    </div>
  );
};

export default Reports;
