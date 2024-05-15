import React from "react";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MainLayout;
