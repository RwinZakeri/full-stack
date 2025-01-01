"use client";

import { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute top-0 z-50 h-screen w-full">
      <div className="w-full absolute left-1/2 top-1/2 z-50 max-w-[512px] -translate-x-1/2 -translate-y-1/2 rounded bg-primary-black text-primary-white p-6">
        {children}
      </div>
      <div className="absolute h-screen w-full bg-primary-light-black backdrop-blur-[2px]"></div>
    </div>
  );
};

export default Modal;
