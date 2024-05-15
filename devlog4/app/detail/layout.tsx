import React from "react";
import TopButton from "./components/top-button/TopButton";
import FloatList from "./components/float-list/FloatList";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className="flex h-full">
        <div className="w-[15%] h-full shrink-0">
          <FloatList />
        </div>
        <div className="w-[70%] h-full shrink-0">
          <div className="w-full h-full relative top-[100px]">{children}</div>
        </div>
        <div className="w-[15%] h-full shrink-0"></div>
      </div>
    </div>
  );
};

export default MainLayout;
