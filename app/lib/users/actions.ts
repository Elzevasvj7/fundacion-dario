"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../actions";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import { error } from "console";

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
      error?: string;
    }
  | undefined;

export async function createUser(state: FormState, formData: FormData) {
  try {
    const validateData = {
      user: {
        usuario: formData.get("user") as string,
        password: formData.get("password") as string,
        rol: Number(formData.get("rol")),
      },
    };
    const findUser = await prisma.usuarios.findFirst({
      where: { usuario: validateData.user.usuario },
    });

    if (findUser) {
      return {
        error: "Este nombre usuario ya existe",
      };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(validateData.user.password, salt);
    const user = await prisma.usuarios.create({
      include: { rol_usuarios_rolTorol: true },
      data: {
        ...validateData.user,
        password: hash,
      },
    });
    return {
      message: `Usuario ${user.usuario} creado con exito`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Parece que hubo un error",
    };
  } finally {
    revalidatePath("/dashboard/usuarios");
  }
}
export async function updateUser(state: FormState, formData: FormData) {
  try {
    const validateData = {
      user: {
        user_id: Number(formData.get("user_id")),
        usuario: formData.get("usuario") as string,
        rol: Number(formData.get("rol")),
      },
    };
    const findUser = await prisma.usuarios.findFirst({
      where: { usuario: validateData.user.usuario },
    });

    if (findUser) {
      const user = await prisma.usuarios.update({
        where: {
          user_id: validateData.user.user_id,
        },
        data: {
          rol: validateData.user.rol
        },
      });
      return {
        error: "Este nombre usuario ya existe",
      };
    }
    const user = await prisma.usuarios.update({
      where: {
        user_id: validateData.user.user_id,
      },
      data: {
        ...validateData.user,
      },
    });
    return {
      message: `Usuario actualizado con exito`,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Parece que hubo un error",
    };
  } finally {
    revalidatePath("/dashboard/usuarios");
  }
}
