"use client";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.JSX.Element | React.JSX.Element[];
}) {
  return (
    <SessionProvider>
      <div
        className="md:container md:mx-auto 
          md:border-x-surface md:border-x-2
          grid grid-rows-[auto_auto_1fr]
          bg-background h-screen"
      >
        {children}
      </div>
    </SessionProvider>
  );
}
