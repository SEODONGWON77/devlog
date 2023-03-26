import React from "react";
import List from "./List";
import "../../styles/globals.css";
import Carousel from "./List/components/Carousel";
import Category from "./List/components/Category";
type Props = {};

const Main = async ({}: Props) => {
  return (
    <div className="w-full">
      <div className="w-full flex">
        <div className="w-[10%]">광고 컴포넌트</div>
        <div className="w-[80%] bg-gradient-to-b from-[#bfe1f8] to-[#fafafa]">
          <Carousel />
          <Category />
          <List />
        </div>
        <div className="w-[10%]">광고 컴포넌트</div>
      </div>
    </div>
  );
};

export default Main;
