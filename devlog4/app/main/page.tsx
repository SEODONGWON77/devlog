import React from "react";
import List from "./List";
import TempPostList from "./TempPostList";

type Props = {};

const Main = async ({}: Props) => {
  return (
    <div className="w-full">
      <div className="w-full h-[280px] bg-slate-400">캐러셀 컴포넌트</div>
      <div className="w-full flex">
        <div className="w-[15%] bg-lime-100">광고 컴포넌트</div>
        <div className="w-[70%]"> 
          <div className="w-full h-20 bg-red-300">카테고리컴포넌트</div>
          {/* <TempPostList id={"id"}/> */}
          <List />
        </div>
        <div className="w-[15%] bg-lime-100">광고 컴포넌트</div>
      </div>
    </div>
  );
};

export default Main;
