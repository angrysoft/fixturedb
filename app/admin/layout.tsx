"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { AdminHeader } from "./components/AdminHeader";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminHeader img=""/>
      {children}
    </SessionProvider>
  );
}
