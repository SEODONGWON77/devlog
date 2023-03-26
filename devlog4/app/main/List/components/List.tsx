"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "react-quill/dist/quill.core.css"
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import { Quill } from "react-quill";
import Gallery from "./Gallery";
import { BASE_URL } from "../constants";

const List = ({posts}: any) => {

  const [uniqueKey, setUniqueKey] = useState('');
  const titleHeading = useRef();
  const router = useRouter();

  const titleProps = (pk: string): any => {

    const listKey = pk;

    function moveToDetail() {
      // const titleElement: any = titleHeading.current;
      // console.log('콘솔 headTag', titleElement.__reactFiber$s0h0hrp4ijn);
      // router.push(`/detail/${titleElement.dataId}` as string);
      router.push(`/detail/${listKey}` as string);
    }

    return {
      ref: titleHeading,
      onClick: moveToDetail
    }
  };

  const Posts = () => {
    // let newPk: string;
    return posts.map(({name, htmlStr, index, title, shortContent, createDt}: any) => {

      // const newPk: string = `${Math.floor(Math.random() * 100000) + 1}`;
      // setUniqueKey(newPk);

      const image: string = `https://media.istockphoto.com/id/1322277517/ko/%EC%82%AC%EC%A7%84/%EC%9D%BC%EB%AA%B0%EC%97%90-%EC%82%B0%EC%97%90%EC%84%9C-%EC%95%BC%EC%83%9D-%EC%9E%94%EB%94%94.jpg?s=1024x1024&w=is&k=20&c=aI6xe1rXGKkbA-BdjMwqg5NVXEoOkhIPQe6sy5zTMsA=`;
      const imsiTitle: string = title ? title :  `임시컨텐츠.. 타이틀`;
      const imsiCont: string =  shortContent ? shortContent : "서브내용";
      const imsiDate: string = createDt ? String(createDt).substring(0,10) : `1993-05-09`;

      useEffect(() => {
        // new Quill('.quill-editor', {
        //   modules: {
        //     toolbar: false    // Snow includes toolbar by default
        //   },
        //   theme: 'snow'
        // });
      }, [imsiCont]);

      return (
        <div
          key={index}
          className="cursor-pointer m-7 w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          {...titleProps(index)}>
          <div>
            <Gallery
              url={image}
              alt={`product-${index}`}
            />
            <div className="p-5">
                <h5 {...titleProps(index)} className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{imsiTitle}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{imsiCont}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{imsiDate}</p>
            </div>
          </div>
        </div>
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
