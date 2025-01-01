"use client";
import Auth from "@/components/auth/auth";
import { ReactNode, useState } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  if (!isLoggedIn) {
    return <Auth />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
