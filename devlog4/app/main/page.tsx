import React from "react";
import List from "./List";
import { BASE_URL, IMG_URL } from "./List/constants";
import TempPostList from "./TempPostList";

type Props = {};

const Main = async ({}: Props) => {
  const productsData = await getProductsData();
  // const imgData = await getImgData();

  const listData = await Promise.all([productsData]);

  return (
    <div className="w-full">
      <div className="w-full h-[280px] bg-slate-400">캐러셀 컴포넌트</div>
      <div className="w-full flex">
        <div className="w-[17.5%] bg-lime-100">광고 컴포넌트</div>
        <div className="w-[65%]"> 
          <div className="w-full h-20 bg-red-300">카테고리컴포넌트</div>
          <TempPostList id={"id"}/>
          {/* <List data={listData} /> */}
        </div>
        <div className="w-[17.5%] bg-lime-100">광고 컴포넌트</div>
      </div>
    </div>
  );
};

export default Main;

const getProductsData = async () => {
  const url = `${BASE_URL("/products")}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${url}`,
    },
  });
  return res.json();
};

// const getImgData = async () => {
//   const url = IMG_URL();
//   const res = await fetch(`${url}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': `${url}`,
//     },
//   });
//   return res.json();
// }
