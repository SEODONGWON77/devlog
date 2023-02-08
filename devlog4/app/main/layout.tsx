import React from "react";
import Main from "./components/Main";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <Main />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MainLayout;
