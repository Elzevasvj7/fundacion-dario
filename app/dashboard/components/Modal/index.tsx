import React, { RefObject } from "react";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="modal text-black overflow-y-hidden overflow-x-hidden"
      role="dialog"
    >
      <div className="modal-box h-auto bg-slate-50 p-5">{children}</div>
    </div>
  );
};
