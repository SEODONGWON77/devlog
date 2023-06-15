import React from "react";
import DetailPage from "./page";
import LikeButton from "./components/like-button/LikeButton";
import FloatList from "./components/float-list/FloatList";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <div className="h-[60px] w-full bg-[#5bbdff] px-[12.5%] text-white">
        <Header />
      </div>
      <div className="flex h-[100vh]">
        <div className="w-[10%] h-[100vh]">
          <LikeButton />
        </div>
        <div className="w-[80%] h-[100vh]">
          {/* @ts-ignore */}
          <DetailPage />
          <div className="w-full h-[100vh]">{children}</div>
        </div>
        <div className="w-[10%] h-[100vh]">
          <FloatList />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
