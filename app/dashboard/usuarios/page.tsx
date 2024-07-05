import React from "react";
import { prisma } from "@/app/lib/prisma";
import { UsersTable } from "@/app/components/users/UsersTable";
import { getSession } from "@/app/lib/actions";
import { redirect } from "next/navigation";

async function getData() {
  try {
    const data = await prisma.usuarios.findMany({
      include: {
        rol_usuarios_rolTorol: true,
      },
      where: {
        rol_usuarios_rolTorol: {
          OR: [{nombre_rol:'Administrador'}, {nombre_rol: 'Secretario'}]
        },
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

async function Users() {
  const users = await getData();
  const session = await getSession();
  if (session.rol != "Administrador") {
    redirect("/dashboard");
  }
  return <UsersTable users={users} />;
}

export default Users;
