import "../styles/globals.css";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="border-4 border-red-400 p-2 w-full">
        <Header />
        {children}
      </body>
    </html>
  );
}