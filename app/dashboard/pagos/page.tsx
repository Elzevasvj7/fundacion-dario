import { PaymentsTable } from "@/app/components/payments/PaymentsTable";
import { prisma } from "@/app/lib/prisma";
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
  console.log(payments);
  return (
    <div className="p-5">
      <PaymentsTable payments={payments} />;
    </div>
  );
}

export default Payments;
