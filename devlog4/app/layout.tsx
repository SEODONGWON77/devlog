"use client"

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getClient } from "app/main/queryClient";
import "../styles/globals.css";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={getClient()}>
      <html>
        <head />
        <body className="border-4 border-red-400 p-2 w-full">
          <Header />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}