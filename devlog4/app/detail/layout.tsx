import React from "react";
import DetailPage from "./page";
import TopButton from "./components/top-button/TopButton";
import FloatList from "./components/float-list/FloatList";
import Header from "../components/Header";
import Toc from "./components/toc/Toc";
import { Main } from "next/document";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className="flex h-full">
        <div className="w-[15%] h-full shrink-0">{/* <FloatList /> */}</div>
        <div className="w-[70%] h-full shrink-0">
          <div className="w-full h-full relative top-[100px]">{children}</div>
        </div>
        <div className="w-[15%] h-full shrink-0">
          <FloatList />
          <TopButton />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
