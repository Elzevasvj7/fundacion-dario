import { prisma } from "@/app/lib/prisma";
import React from "react";

async function getData(id: any) {
  try {
    const data = await prisma.usuarios.findUnique({
      where: {
        user_id: parseInt(id),
      },
      include: {
        rol_usuarios_rolTorol: true
      }
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
}

async function User({ params: { id } }: { params: { id: string } }) {
  const user = await getData(id);
  return (
    <div className="p-5">
      <div className="bg-white card p-5">
        <div>
          <h3 className="font-semibold">Usuario:</h3>
          <p className="text-black">{user?.usuario}</p>
        </div>
        <div>
          <h3 className="font-semibold">Rol:</h3>
          <p className="text-black">{user?.rol_usuarios_rolTorol?.nombre_rol}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
