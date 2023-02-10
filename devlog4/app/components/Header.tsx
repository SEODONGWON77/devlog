import React from "react";
import Link from "next/link";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


type Props = {};

function Header({}: Props) {
  return (
    <nav className="flex space-x-4 mb-2">
      {/* <Link href="/" className="bg-blue-200 rounded px-4 py-2">
        Home
      </Link> */}
      <Link href="/main" className="bg-cyan-200 rounded px-4 py-2">
        Main Page
      </Link>
      {
        process.env.NODE_ENV !== 'production' ? <ReactQueryDevtools initialIsOpen={true} /> : null
      }
    </nav>
  );
}

export default Header;
