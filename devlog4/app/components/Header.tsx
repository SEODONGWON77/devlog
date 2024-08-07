"use client";

import React, { useEffect, Fragment } from "react";
import Link from "next/link";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useSession, signOut } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { userEmailState, userNameState } from "../recoil/state";

const Header = () => {
  const { data } = useSession();

  const userName: any = data?.user?.name;
  const userEmail: any = data?.user?.email;

  const setUserName = useSetRecoilState(userNameState);
  const setUserEmail = useSetRecoilState(userEmailState);

  useEffect(() => {
    setUserName(userName);
    setUserEmail(userEmail);
  }, [userEmail, userName]);

  return (
    <nav className="navbar">
      <div className="fixed top-0 w-full h-[60px] flex px-[12.5%] text-white bg-[#5bbdff] z-20">
        <div className="h-full p-4 text-2xl font-bold">
          <Link href="/main">DevLog</Link>
        </div>
        <div className="flex ml-auto p-4 gap-3">
          {data?.user &&<Link href="/temp">임시</Link>}
          <Link href="/main">메인</Link>
          {data?.user ? (
            <Fragment>
              <span className="cursor-pointer">{userName}님 안녕하세요.</span>
              <span className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </span>

              <Link
                href="/post"
                className="bg-[#08a4ff] rounded px-4 flex items-center mt-[-2px]"
              >
                <span className="text-sm">게시글 등록</span>
              </Link>
            </Fragment>
          ) : (
            <Link className="nav-link" href="/auth/login">
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
