import React from "react";
import Detail from "./components/Detail";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <Detail />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MainLayout;
