import React from "react";
import MainEtc from "./components/MainEtc";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <MainEtc />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MainLayout;