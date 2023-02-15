import React from "react";
import Link from "next/link";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data } = useSession();

  return (
    <nav className="navbar navbar-light bg-light row justify-content-center sticky-top">
      <div className="container">
        <div className="">
          <Link href="/main" className="bg-cyan-200 rounded px-4 py-2">
            타이틀
          </Link>
        </div>
        <div className="col-3 mt-3 mt-md-0 text-right d-flex flex-row">
          <Link href="/main" className="bg-cyan-200 rounded px-4 py-2">
            메인
          </Link>
          {data?.user ? (
            <>
              <span className="cursor-pointer">
                {data?.user?.name}님 안녕하세요.
              </span>

              <span className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </span>

              <Link href="/post" className="bg-cyan-200 rounded px-4 py-2">
                게시글 등록
              </Link>
            </>
          ) : (
            <span style={{ marginRight: "15px" }}>
              <Link className="nav-link" href="auth/login">
                Login
              </Link>
            </span>
          )}
        </div>
      </div>
    {process.env.NODE_ENV !== 'production' ? <ReactQueryDevtools initialIsOpen={true} /> : null}
    </nav>
  );
};

export default Header;
