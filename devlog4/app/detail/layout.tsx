import React from "react";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex w-full h-full justify-center">
        <div className="w-[250px] h-full shrink-0 flex relative">
          <div className="w-[200px] h-[500px] bg-gray-300 fixed top-[25%] flex items-center justify-center">애드샌스</div>
        </div>
        <div className="w-[768px] h-full shrink-0">
          <div className="w-full h-full relative top-[100px]">{children}</div>
        </div>
        <div className="w-[250px] h-full shrink-0"></div>
      </div>
    </div>
  );
};

export default MainLayout;
