"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useSession, signOut } from "next-auth/react";
import { useSetRecoilState } from 'recoil';
import { userNameState } from "../recoil/state";

const Header = () => {
  const { data } = useSession();

  const userName: any = data?.user?.name;
  const setUserName = useSetRecoilState(userNameState);

  useEffect(() => {
    setUserName(userName);
  }, [userName]);

  return (
    <nav className="navbar">
      <div className="w-full h-[60px] flex px-[17.5%]">
        <div className="h-full p-4">
          <Link href="/main">DevLog</Link>
        </div>
        <div className="flex ml-auto p-4 gap-3">
          <Link href="/main">
            메인
          </Link>
          {data?.user ? (
            <>
              <span className="cursor-pointer">
                {userName}님 안녕하세요.
              </span>

              <span className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </span>

              <Link href="/post" className="bg-cyan-200 rounded px-4 py-2">
                게시글 등록
              </Link>
            </>
          ) : (
            <Link className="nav-link" href="auth/login">
              Login
            </Link>
          )}
        </div>
      </div>
      {process.env.NODE_ENV !== "production" ? (
        <ReactQueryDevtools initialIsOpen={true} />
      ) : null}
    </nav>
  );
};

export default Header;
