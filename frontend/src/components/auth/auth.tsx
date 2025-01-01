"use client";
import Modal from "@/module/modal";
import { AuthType } from "@/types/global"; // Assuming AuthType is defined correctly in global types
import { ReactNode, useState } from "react";
import Login from "./login";
import Register from "./register";

const Auth = () => {
  const [position, setPosition] = useState<AuthType>(AuthType.login);

  const authPosition = (step: AuthType): ReactNode => {
    switch (step) {
      case 1:
        return <Login setPosition={setPosition} />;
      case 2:
        return <Register setPosition={setPosition} />;
      default:
        console.warn("unexpected step value" + " " + position);
        return null;
    }
  };

  return <Modal>{authPosition(position)}</Modal>;
};

export default Auth;
