"use client";
import Modal from "@/module/modal";
import { AuthType } from "@/types/global"; // Assuming AuthType is defined correctly in global types
import { ReactNode, Suspense, useState } from "react";
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

  return (
    <div className="w-full h-screen bg-white">
      hello world
      <Modal>
        <Suspense fallback={"loading..."}>{authPosition(position)}</Suspense>{" "}
      </Modal>
    </div>
  );
};

export default Auth;
