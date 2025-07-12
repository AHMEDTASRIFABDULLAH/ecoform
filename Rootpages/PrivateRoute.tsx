"use client";

import { useUser } from "@/context/UserContext";
import Loding from "@/Pages/MyLoding";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return <Loding />;
  if (!user) return null;

  return <>{children}</>;
};

export default PrivateRoute;
