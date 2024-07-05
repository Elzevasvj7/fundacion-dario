import { PaymentsTable } from "@/app/components/payments/PaymentsTable";
import { getSession } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

async function getPayments() {
  try {
    const data = await prisma.pagos.findMany({
      include: {
        inscripcion: {
          include: { curso: true },
        },
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch students");
  }
}

async function Payments() {
  const payments = await getPayments();
  const session = await getSession();
  if (session.rol != "Administrador") {
    redirect("/dashboard");
  }
  return (
    <div className="p-5">
      <PaymentsTable payments={payments} />;
    </div>
  );
}

export default Payments;
