import { QualificationTable } from "@/app/components/qualification/QualificationTable";
import { prisma } from "@/app/lib/prisma";
import React from "react";

async function getQualifications(materia: number, profesor: number) {
  try {
    const data = await prisma.materia_estudiante.findMany({
      where: {
        AND: {
          materia_id: materia,
          materia: {
            profesor_id: profesor,
          },
        },
      },
      include: {
        materia: {
          include: {
            curso: true,
          },
        },
        alumno: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch teacher");
  }
}
async function getSubject(materia: number) {
  try {
    const data = await prisma.materia.findFirst({
      where: {
        materia_id: materia,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch teacher");
  }
}

async function Qualification({
  searchParams,
}: {
  searchParams: {
    materia: string;
    profesor: string;
  };
}) {
  const califications = await getQualifications(
    parseInt(searchParams.materia),
    parseInt(searchParams.profesor)
  );
  const subject = await getSubject(parseInt(searchParams.materia));
  return (
    <div className="p-5">
      <QualificationTable
        q={califications}
        subject={subject}
        teacher={searchParams.profesor}
      />
    </div>
  );
}

export default Qualification;
