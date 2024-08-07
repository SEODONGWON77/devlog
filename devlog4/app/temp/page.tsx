import React from "react";
import List from "./List";
import "../../styles/globals.css";
import Header from "app/components/Header";
import { getTempPostCardList } from "../lib/action";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import type { AuthOptions } from "next-auth";

const Temp = async () => {
  const session = await getServerSession(authOptions as AuthOptions)
  const userEmail = session?.user?.email ?? ""

  const { response: postTempCardList } = await getTempPostCardList(userEmail);

  return (
    <div className="w-full h-screen">
      <div className="w-full z-20 fixed top-0 h-[100px]">
        <Header />
      </div>
      <div className="h-[330px] relative w-full bg-[#5bbdff] flex justify-center items-center text-white">
        임시 게시글
      </div>
      <div className="w-full flex">
        <div className="w-[10%]"></div>
        <div className="w-[80%]">
          <List postCardList={postTempCardList} />
        </div>
        <div className="w-[10%]"></div>
      </div>
    </div>
  );
};

export default Temp;