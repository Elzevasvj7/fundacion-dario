"use client";
import { CourseIcon, EnrollmentIcon, StudentIcon, SubjectIcon } from "@/app/icons/icons";
import { logout } from "@/app/lib/actions";
import { FilePdfOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import React, { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = ({ user }: { user: any }) => {
  const items: MenuItem[] = [
    {
      key: "1",
      label: <summary>Estudiantes</summary>,
      children: [
        {
          key: "1-1",
          label: <Link href="/dashboard/alumnos">Lista de estudiantes</Link>,
        },
      ],
      icon: (
        <StudentIcon/>
      ),
    },
    {
      key: "2",
      label: <summary>Pagos</summary>,
      children: [
        {
          key: "2-1",
          label: <Link href="/dashboard/pagos">Lista de pagos</Link>,
        },
      ],
      icon : <WalletOutlined />
    },
    {
      key: "3",
      label: <summary>Usuarios</summary>,
      children: [
        {
          key: "3-1",
          label: <Link href="/dashboard/usuarios">Lista de usuarios</Link>,
        },
      ],
      icon: <UserOutlined />
    },
    {
      key: "4",
      label: <Link href="/dashboard/cursos">Cursos</Link>,
      icon: <CourseIcon/>
    },
    {
      key: "5",
      label: <Link href="/dashboard/materias">Materias</Link>,
      icon: <SubjectIcon/>
    },
    {
      key: "6",
      label: <Link href="/dashboard/inscripciones">Inscripciones</Link>,
      icon: <EnrollmentIcon/>
    },
    {
      key: "7",
      label: <Link href="/dashboard/reportes">Reportes</Link>,
      icon: <FilePdfOutlined />
    },
  ];

  const itemsS: MenuItem[] = [
    {
      key: "1",
      label: "Estudiantes",
      children: [
        {
          key: "1-1",
          label: <Link href="/dashboard/alumnos">Lista de estudiantes</Link>,
        },
      ],
    },
    {
      key: "2",
      label: <Link href="/dashboard/cursos">Cursos</Link>,
    },
    {
      key: "3",
      label: <Link href="/dashboard/inscripciones">Inscripciones</Link>,
    },
    {
      key: "4",
      label: <Link href="/dashboard/reportes">Reportes</Link>,
    },
  ];

  const itemsE: MenuItem[] = [
    {
      key: "1",
      label: <Link href="/dashboard/cursos">Cursos</Link>,
    },
    {
      key: "2",
      label: <Link href="/dashboard/inscripciones">Inscripciones</Link>,
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      width={200}
    >
      {user.rol == "Administrador" && (
        <Menu mode="inline" items={items} className="h-full" />
      )}
      {user.rol == "Estudiante" && (
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={itemsE}
          className="h-full"
        />
      )}
      {user.rol == "Secretario" && (
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={itemsS}
          className="h-full"
        />
      )}
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
        className="text-black absolute bottom-0 left-5"
      >
        {collapsed ? "A" : "B"}
      </Button> */}
    </Sider>
  );
};

export default Sidebar;
