"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import puppeteer from "puppeteer";
import { getSession } from "../actions";

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

export async function getCourses() {
  try {
    const data = await prisma.curso.findMany();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch courses");
  }
}

export async function createCourse(formData: FormData) {
  const validateData = {
    nombre_curso: formData.get("name")?.toString(),
    monto: Number(formData.get("monto")),
    estatus: formData.get("estatus")?.toString(),
    fechaInicio: (() => {
      const fechaInicio = formData.get("fechaInicio");
      return fechaInicio ? new Date(fechaInicio.toString()) : null;
    })(),
    fechaFin: (() => {
      const fechaFin = formData.get("fechaFin");
      return fechaFin ? new Date(fechaFin.toString()) : null;
    })(),
  };
  const response = await prisma.curso.create({
    data: { ...validateData },
  });
  revalidatePath("/dashboard/cursos");
}
export async function updateCourse(courseId: number, formData: FormData) {
  const data = {
    nombre_curso: formData.get("name")?.toString(),
    monto: Number(formData.get("monto")),
    estatus: formData.get("estatus")?.toString(),
    fechaInicio: (() => {
      const fechaInicio = formData.get("fechaInicio");
      return fechaInicio ? new Date(fechaInicio.toString()) : null;
    })(),
    fechaFin: (() => {
      const fechaFin = formData.get("fechaFin");
      return fechaFin ? new Date(fechaFin.toString()) : null;
    })(),
  };

  const response = await prisma.curso.update({
    where: { curso_id: courseId },
    data: { ...data },
  });
  revalidatePath("/dashboard/cursos");
}
export async function deleteCourse(courseId: number) {
  const response = await prisma.curso.delete({ where: { curso_id: courseId } });
  revalidatePath("/dashboard/cursos");
}

export async function enrollmentCourse(state: FormState, { courseId }: any) {
  try {
    const session = await getSession();
    const student = await prisma.alumnos.findFirst({
      where: {
        usuarios: {
          user_id: session.userId,
        },
      },
    });
    const enrollment = await prisma.inscripcion.create({
      data: {
        alumno_id: student?.alumno_id,
        curso_id: parseInt(courseId),
        turno_id: 1,
        estatus: "Activa",
      },
      include: {
        curso: {
          include: {
            materia: true,
          },
        },
      },
    });
    const payment = await prisma.pagos.create({
      data: {
        inscripcion_id: enrollment.inscripcion_id,
        estatus: "Pendiente",
        monto: enrollment.curso?.monto,
      },
    });
    const materias = enrollment.curso?.materia;
    const datas = materias?.map((m) => ({
      alumno_id: student?.alumno_id,
      materia_id: m.materia_id,
      nota: 0, // Puedes establecer la nota inicial aquí si es necesario
    }));
    const m_s = await prisma.materia_estudiante.createMany({
      data: datas ? datas : [],
    });
    return {
      message: "Inscripcion creada con exito",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Parece que hubo un erro",
    };
  } finally {
    revalidatePath("/dashboard/cursos/[id]", "page");
  }
}

export async function generateReportCourses(
  state: FormState,
  courseId: number
) {
  try {
    const course = await prisma.curso.findUnique({
      where: {
        curso_id: courseId,
      },
      include: {
        materia: {
          include: {
            profesor: true,
            materia_estudiante: {
              include: {
                alumnos: true,
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
  </style>
</head>

<body>
  <header>
    <div>
      <h1>Fundacion dario</h1>
    </div>
  </header>
  <div class="course_title">
    <h3> Nombre del curso:${data.nombre_curso}
    </h3>
  </div>
  <div>
    ${data.materia
      .map(
        (m: any) =>
          `
    <div>
      <h3>Materia:${m.nombre}</h3>
      <h4>Profesor: ${m.profesor.nombre} ${m.profesor.apellido}</h4>
      <table>
        <thead>
          <tr>
            <td>Nombre y apellido</td>
            <td>Nota</td>
          </tr>
        </thead>
        <tbody>
        ${m.materia_estudiante
          .map(
            (m_s: any) => ` 
            <tr>
              <td>${m_s.alumno.nombre} ${m_s.alumno.apellido}</td>
              <td>${m_s.nota}</td>
            </tr>`
          )
          .join("")}
        </tbody>
      </table>
    </div>
    `
      )
      .join("")}
  </div>
</body>
</html>
 `;
}
