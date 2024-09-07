import { Modal } from "antd";
import React, { RefObject } from "react";

export const ModalComponent = ({ children, open }: { children: React.ReactNode, open: boolean }) => {
  return <Modal centered open={open} footer={null} closeIcon={null}>{children}</Modal>;
};
