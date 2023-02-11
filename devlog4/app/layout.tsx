"use client";

import "../styles/globals.css";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <SessionProvider>
        <body className="border-4 border-red-400 p-2 w-full">
          <Header />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
