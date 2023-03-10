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
    return posts.map(({name, htmlSrc}: any) => {

      const newPk: string = `${Math.floor(Math.random() * 100000) + 1}`;
      // setUniqueKey(newPk);

      const image: string = `https://media.istockphoto.com/id/1322277517/ko/%EC%82%AC%EC%A7%84/%EC%9D%BC%EB%AA%B0%EC%97%90-%EC%82%B0%EC%97%90%EC%84%9C-%EC%95%BC%EC%83%9D-%EC%9E%94%EB%94%94.jpg?s=1024x1024&w=is&k=20&c=aI6xe1rXGKkbA-BdjMwqg5NVXEoOkhIPQe6sy5zTMsA=`;
      const imsiTitle: string = `임시컨텐츠.. 타이틀`;
      const imsiCont: string = `임시컨텐츠.. 내용`;
      const imsiDate: string = `2023.03.05`;

      useEffect(() => {
        // new Quill('#editor', {
        //   modules: {
        //     toolbar: false    // Snow includes toolbar by default
        //   },
        //   theme: 'snow'
        // });
      }, []);

      return (
        <div
          key={newPk}
          className="m-0.5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Gallery
            url={image}
            alt={`product-${newPk}`}
          />
          <div className="p-5">
              <h5 {...titleProps(newPk)} className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{imsiTitle}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{imsiCont}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{imsiDate}</p>
          </div>
        </div>
        // <li
        //   key={newPk}
        //   className="flex items-start space-x-6 p-6"
        //   >
        //   <Gallery
        //     url={image}
        //     alt={`product-${newPk}`}
        //   />
        //   <div className="min-w-0 relative flex-auto">
        //     <h2 {...titleProps(newPk)} className="font-semibold text-slate-900 truncate pr-20 cursor-pointer">{name}</h2>
        //     <div className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
        //       <div className="w-full mt-2 font-normal text-slate-400">
        //         {imsiCont}
        //         <div className="ql-editor"
        //           dangerouslySetInnerHTML={{
        //             __html: htmlSrc,
        //           }}>  
        //         </div> 
        //       </div>
        //     </div>
        //   </div>
        // </li>
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
