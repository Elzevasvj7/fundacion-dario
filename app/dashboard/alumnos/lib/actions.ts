"use server";

import { getSession } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import axios from "axios";
import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer";
import { z } from "zod";

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      data?: string;
      error?: string;
    }
  | undefined;

const schema = z.object({
  nombre: z.string({
    message: "El nombre es requerido.",
    required_error: "El nombre es requerido",
  }),
  apellido: z.string({ message: "El apellido es requerido." }),
  edad: z.number().int({ message: "La edad debe ser un número entero." }),
  telefono: z.string({ required_error: "El teléfono es requerido." }),
  correo: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "El correo electrónico debe ser válido." }),
  direccion: z.string({ message: "La dirección es requerida." }),
  cedula: z.string({ message: "La cédula es requerida." }),
  codigo: z.string()
});

export async function createStudent(formData: FormData) {
  const validateData = schema.safeParse({
    nombre: formData.get("name"),
    apellido: formData.get("lastName"),
    edad: Number(formData.get("age")),
    telefono: formData.get("phone"),
    direccion: formData.get("address"),
    correo: formData.get("email"),
    cedula: formData.get("cedula"),
    estatus: 1,
  });
  if (!validateData.success) {
    console.log(validateData.error.flatten().fieldErrors);
    return {
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/student",
    {
      ...validateData.data,
    }
  );
  revalidatePath("/dashboard/alumnos");
}
export async function updateStudent(userId: number, formData: FormData) {
  const validateData = schema.safeParse({
    nombre: formData.get("name") as string,
    apellido: formData.get("lastName") as string,
    edad: Number(formData.get("age")),
    telefono: formData.get("phone") as string,
    direccion: formData.get("address") as string,
    correo: formData.get("email") as string,
    cedula: formData.get("cedula") as string,
    codigo: formData.get("code") as string,
  });
  console.log("user", userId);
  console.log(validateData.data);
  if (!validateData.success) {
    console.log(validateData.error.flatten().fieldErrors);
    return {
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  const student = await prisma.alumnos.update({
    where: { alumno_id: userId },
    data: validateData.data,
  });
  revalidatePath("/dashboard/alumnos");
}
export async function deleteStudent(userId: number) {
  const user = await prisma.usuarios.findUnique({
    where: { user_id: userId },
  });
  const deleteStudent = await prisma.alumnos.delete({
    where: { user_id: user?.user_id },
  });
  revalidatePath("/dashboard/alumnos");
}

export async function generateStudentReport() {
  try {
    const session = await getSession();
    const course = await prisma.alumnos.findFirst({
      where: {
        usuarios: {
          user_id: session.userId,
        },
      },
      include: {
        inscripcion: {
          include: {
            curso: {
              include: {
                materia: {
                  include: {
                    profesor: true,
                    materia_estudiante: {
                      where: {
                        alumno: { usuarios: { user_id: session.userId } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      // include: {
      //   materia: {
      //     include: {
      //       profesor: true,
      //       materia_estudiante: {
      //         include: {
      //           alumno: true,
      //         },
      //       },
      //     },
      //   },
      // },
    });
    console.log(course);
    const pdf = await generatePdfData(course);
    const pdfBuffer = pdf.toString("base64");
    return {
      data: pdfBuffer,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Parece que hubo un error",
    };
  }
}

const generatePdfData = async (courses: any) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    const htmlContent = matricula(courses);
    console.log(htmlContent);
    await page.setContent(htmlContent);
    const pdf = await page.pdf({
      path: "mypdf",
      format: "A4",
      margin: { left: "0.5cm", top: "1cm", right: "0.5cm", bottom: "2cm" },
    });
    await browser.close();
    return pdf;
  } catch (error) {
    console.log("Parece que hubo un error: ", error);
    throw new Error("Parece que hubo un error al generar el pdf");
  }
};

function matricula(data: any) {
  return `
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 10px;
      font-family: "Arial", sans-serif;
      font-size: 12px;
    }

    header {
      text-align: center;
    }

    header div {
      display: flex;
      justify-content: center;
    }

    header div img {
      display: block;
      margin: 0 auto;
      width: 100px;
      height: 100px;
    }

    table {
      border-collapse: collapse;
      width: 675px;
      margin-left: auto;
      margin-right: auto;
    }

    th,
    td {
      border: 1px solid black;
      padding: 3px;
      text-align: center;
      font-size: 12px;
    }

    th {
      background-color: #f2f2f2;
    }

    p {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  </style>
</head>

<body>
  <header>
    <div>
      <h1>Fundacion dario</h1>
    </div>
  </header>
  <div class="course_title">
    <h3> Nombre y apellido del estudiante: ${data.nombre} ${data.apellido}</h3>
  </div>
  <div>
    ${data.inscripcion
      .map(
        (m: any) =>
          `
      <div>
        <h3>Curso: ${m.curso.nombre_curso}</h3>
      <div>
      <table>
        <thead>
          <tr>
            <td>Materia</td>
            <td>Nombre y apellido del profesor</td>
            <td>Nota</td>
          </tr>
        </thead>
        <tbody>
            ${m.curso.materia
              .map(
                (n: any) =>
                  `
                <tr>
                  <td>${n.nombre}</td>
                  <td>${n.profesor.nombre} ${n.profesor.apellido}</td>
                  <td>${n.materia_estudiante[0].nota}</td>
                </tr>
              `
              )
              .join("")}
        </tbody>
      </table>
      </div>
    </div>
    `
      )
      .join("")}
  </div>
</body>
</html>
 `;
}
