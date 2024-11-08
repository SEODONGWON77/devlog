"use server"

import React from "react";
import List from "./List";
import "../../styles/globals.css";
import Header from "app/components/Header";
import Search from "./List/components/Search";
import InfiniteScroll from "./List/components/infinite-scroll";
import { getUsers, getPostCardList } from "../lib/action";

type Props = {};

const Main = async ({}: Props) => {
  await getUsers();
  // const { response: postCardList } = await getPostCardList(); 
 
  return (
    <div className="w-full h-screen">
      <div className="w-full z-20 fixed top-0 h-[100px]">
        <Header />
      </div>
      <div className="h-[330px] relative w-full bg-[#5bbdff] flex justify-center items-center text-white">
        teamDevelop2
      </div>
      <div className="w-full">
        <div className="w-[10%]"></div>
          <div className="w-[80%]"></div>
            <InfiniteScroll
              propName="postCardList"
              fetcher={getPostCardList}
              count={12}
            >
              <List postCardList={[]}/>
            </InfiniteScroll>
          </div>
        <div className="w-[10%]">
      </div>
    </div>
  );
};

export default Main;
