import Link from "next/link";
import React from "react";

type Props = {};

function Header({}: Props) {
  return (
    <nav className="flex space-x-4 mb-2">
      <Link href="/" className="bg-blue-200 rounded px-4 py-2">
        Home
      </Link>
      <Link href="/login" className="bg-cyan-200 rounded px-4 py-2">
        Login Page
      </Link>
    </nav>
  );
}

export default Header;
