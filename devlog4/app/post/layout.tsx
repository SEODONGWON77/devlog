import React from "react";
import Post from "./components/Post";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <Post />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MainLayout;
