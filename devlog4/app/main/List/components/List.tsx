"use client";

import React, {useState, useEffect} from "react";
import Link from "next/link";
import Gallery from "./Gallery";
import { BASE_URL } from "../constants";

const List = ({posts}: any) => {

  const [uniqueKey, setUniqueKey] = useState('');

  const Posts = () => {
    let newPk: string;
    return posts.map(({id, title, price, image}: any) => {

      newPk = `${id}-dv4-${Math.floor(Math.random() * 1000) + 1}`;
      // setUniqueKey(newPk);

      return (
        <li
          // key={`${id}-dv4-${Math.floor(Math.random() * 1000) + 1}`}
          key={newPk}
          className="flex items-start space-x-6 p-6"
          >
          <Gallery
            // key={`${id}-dv4-${Math.floor(Math.random() * 1000) + 1}`}
            url={image}
            alt={`product-${id}`}
          />
          {/* 링크 태우기 */}
          <div className="min-w-0 relative flex-auto">
            <h2 className="font-semibold text-slate-900 truncate pr-20 cursor-pointer">
              <Link href={`/post/${id}`}>{title}</Link>
            </h2>
            <div className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
              <div className="w-full mt-2 font-normal text-slate-400">{price}</div>
            </div>
          </div>
        </li>
      )
    });
  }

  return (
    <>
      <Posts />
      {/* {posts.map((data: any) => (
        <div
          key={`${data.id}-dv4-${Math.floor(Math.random() * 1000) + 1}`}
          className="border-4 border-yellow-500 text-2xl text-yellow-400 p-2"
          >
          <div className="back">
            <strong> {data.id}</strong> {data.title}
          </div>
          {data.price}
          <Gallery
            pk={`${data.id}-dv4-${Math.floor(Math.random() * 1000) + 1}`}
            src={data.image}
            alt={`product-${data.id}`}
          />
        </div>
      ))} */}
    </>
  );
};

export default List;
