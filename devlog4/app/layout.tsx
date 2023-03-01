"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import Header from "./components/Header";

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

// react-query api
const getClient = (() => {
	let client: QueryClient | null = null;
	return () => {
		if (!client)
			client = new QueryClient({
				defaultOptions: {
					queries: {
						cacheTime: 1000 * 60 * 60 * 24,
						staleTime: 1000 * 60,
						refetchOnWindowFocus: false,
						refetchOnMount: false,
					},
				},
			});
		return client;
	};
})();