"use client";

import React, {useState, useEffect} from "react";
import Gallery from "./Gallery";

const List = ({posts}: any) => {

  const [uniqueKey, setUniqueKey] = useState('');

  const Posts = () => {
    let newPk: string;
    return posts.map(({id, title, price, image}: any) => {

      // newPk = `${id}-dv4-${Math.floor(Math.random() * 1000) + 1}`;
      // setUniqueKey(newPk);
      // console.log('uniqueKey', uniqueKey);

      return (
        <li
          key={`${id}-dv4-${Math.floor(Math.random() * 1000) + 1}`}
          className="flex items-start space-x-6 p-6"
          >
          <Gallery
            key={`${id}-dv4-${Math.floor(Math.random() * 1000) + 1}`}
            src={image}
            alt={`product-${id}`}
          />
          {/* 링크 태우기 */}
          <div className="min-w-0 relative flex-auto">
            <h2 className="font-semibold text-slate-900 truncate pr-20">{price}</h2>
            <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
             <div className="absolute top-0 right-0 flex items-center space-x-1">
              <dt className="sr-only">unit</dt>
              <dd className="text-slate-400">\</dd>
             </div>
             <div className="flex-none w-full mt-2 font-normal">
              <dt className="sr-only">title</dt>
              <dd className="text-slate-400">{title}</dd>
            </div>
            </dl>
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
