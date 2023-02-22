"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import Header from "./components/Header";
import { getClient } from "./queryClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={getClient()}>
        <html>
          <head />
          <SessionProvider>
            <body className="w-full h-screen">
              <Header />
              {children}
            </body>
          </SessionProvider>
        </html>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
