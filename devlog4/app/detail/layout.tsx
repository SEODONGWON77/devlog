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
      <Header />
      <div className="flex h-[100vh] pt-[60px]">
        <div className="w-[15%] h-[100vh]">
          <LikeButton />
        </div>
        <div className="w-[70%] h-[100vh]">
          {/* @ts-ignore */}
          <DetailPage />
          <div className="w-full h-[100vh]">{children}</div>
        </div>
        <div className="w-[15%] h-[100vh]">
          <FloatList />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
