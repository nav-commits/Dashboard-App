"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/public");
  }, [user, loading, router]);

  if (loading || !user) return <p>Loading...</p>;

  return <>{children}</>;
};
