"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import puppeteer from "puppeteer";

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

export async function updatePayment(paymentId: number, formData: FormData) {
  const data = {
    ref: formData.get("ref")?.toString(),
    modalidad: formData.get("modality")?.toString(),
    // monto: formData.get
    nombre: formData.get("name")?.toString(),
    apellido: formData.get("lastName")?.toString(),
    correo: formData.get("email")?.toString(),
    estatus: "Procesando",
  };
  const response = await prisma.pagos.update({
    where: { pago_id: paymentId },
    data: data,
  });
  revalidatePath("/dashboard/[id]", "page");
}

export async function updatePaymentAdmin(
  paymentId: number,
  formData: FormData
) {
  const data = {
    estatus: formData.get("status")?.toString(),
  };
  const response = await prisma.pagos.update({
    where: { pago_id: paymentId },
    data: data,
  });
  revalidatePath("/dashboard/pagos");
}

export async function generateReportPayment(
  state: FormState,
  courseId: number
) {
  try {
    const course = await prisma.pagos.findUnique({
      where: {
        pago_id: courseId,
      },
      include: {
        inscripcion: {
          include: {
            curso: {
              include: {
                materia: {
                  include: {
                    profesor: true,
                  },
                },
              },
            },
          },
        },
      },
    });
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
      .data {
        display: flex;
        width: 100%;
        align-items: center;
        font-size: 15px;
      }
    </style>
  </head>

  <body>
    <header>
      <div>
         <img
            src="https://i.imgur.com/FHgpUyl.png"
          />
      </div>
    </header>
    <div class="course_title">
      <h3>Nombre del curso:${data.inscripcion.curso.nombre_curso}</h3>
    </div>
    <div>
      <h4>Materias del curso:</h4>
      ${data.inscripcion.curso.materia .map( (m: any) => `
      <div style="display: flex; align-items: center; gap:20px">
        <p>${m.nombre}</p>
        <p>Profesor: ${m.profesor.nombre} ${m.profesor.apellido}</p>
      </div>
      ` ) .join("")}
    </div>
    <br>
    <div style="display: flex; align-items: center; justify-content:center; width: 100%; font-size: 15px; margin-top: 6px; text-align: center;">Datos de facturacion:</div>
    <div style="display: flex; align-items: center; width: 100%; font-size: 15px; margin-top: 6px; gap: 13px;">Nombre: ${data.nombre}</div>
    <div style="display: flex; align-items: center; width: 100%; font-size: 15px; margin-top: 6px; gap: 13px;">Apellido: ${data.apellido}</div>
    <div style="display: flex; align-items: center; width: 100%; font-size: 15px; margin-top: 6px; gap: 13px;">Correo electronico: ${data.correo}</div>
    <div style="display: flex; align-items: center; width: 100%; font-size: 15px; margin-top: 6px; gap: 13px;">Id de referencia: ${data.ref}</div>
    <div style="display: flex; align-items: center; width: 100%; font-size: 15px; margin-top: 6px; gap: 13px;">Modalidad: ${data.modalidad}</div>
    <div style="display: flex; align-items: center; width: 100%; font-size: 15px; margin-top: 6px; gap: 13px;">Monto: $${data.monto}</div>
        <div style="display: flex; align-items: center; width: 100%; font-size: 15px; margin-top: 6px; gap: 13px;">Estatus: ${data.estatus}</div>

  </body>
</html>
 `;
}
