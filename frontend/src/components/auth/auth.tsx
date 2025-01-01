"use client";
import type { AuthType } from "@/types/global"; // Assuming AuthType is defined correctly in global types
import { ReactNode, useState } from "react";
import Login from "./login";
import Register from "./register";

const Auth = () => {
  const [position, setPosition] = useState<AuthType>(1);

  const authPosition = (step: AuthType): ReactNode => {
    switch (step) {
      case 1:
        return <Login setPosition={setPosition} />;
      case 2:
        return <Register setPosition={setPosition} />;
      default:
        return <Register setPosition={setPosition} />;
    }
  };

  return <>{authPosition(position)}</>;
};

export default Auth;
