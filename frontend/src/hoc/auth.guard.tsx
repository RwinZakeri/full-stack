"use client";
import LoadingPage from "@/app/[locale]/loading";
import Auth from "@/components/auth/auth";
import AXIOS from "@/configs/axios";
import QueryKey from "@/configs/react-query/react.query.keys";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  const { isLoading } = useQuery({
    queryKey: [QueryKey.isloggedIn],
    queryFn: async () => {
      const res = await AXIOS.get("/isexist");
      if (res.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      return res;
    },
    refetchInterval: 0,
    retry: 0,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isLoggedIn) {
    return <Auth />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
