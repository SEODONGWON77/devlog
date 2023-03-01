"use client";

import React, { useId, useState, useRef } from "react";
import { useRouter } from 'next/navigation';

import Gallery from "./Gallery";
import { BASE_URL } from "../constants";

const List = ({posts}: any) => {

  const [uniqueKey, setUniqueKey] = useState('');
  const titleHeading = useRef();
  const router = useRouter();

  const titleProps = (pk: string): any => {

    const listKey = pk;

    function moveToDetail() {
      console.log('콘솔 click 테스트', listKey);

      // const titleElement: any = titleHeading.current;
      // console.log('콘솔 headTag', titleElement.__reactFiber$s0h0hrp4ijn);
      // router.push(`/detail/${titleElement.dataId}` as string);
      
      router.push(`/detail/${listKey}` as string, {
        
      });
    }

    return {
      ref: titleHeading,
      onClick: moveToDetail
    }
  };

  const Posts = () => {
    // let newPk: string;
    return posts.map(({id, title, price, image}: any) => {

      const newPk: string = `${id}-dv4-${Math.floor(Math.random() * 100000) + 1}`;
      // setUniqueKey(newPk);

      return (
        <li
          key={newPk}
          className="flex items-start space-x-6 p-6"
          >
          <Gallery
            url={image}
            alt={`product-${id}`}
          />
          {/* 링크 태우기 */}
          <div className="min-w-0 relative flex-auto">
            <h2 {...titleProps(newPk)} className="font-semibold text-slate-900 truncate pr-20 cursor-pointer">{title}</h2>
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
    </>
  );
};

export default List;
