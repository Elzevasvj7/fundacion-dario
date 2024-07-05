import { PaymentsTable } from "@/app/components/payments/PaymentsTable";
import React from "react";

async function PaymentReport() {
  return (
    <div className="p-5">
      <PaymentsTable payments={[]} />
    </div>
  );
}

export default PaymentReport;
