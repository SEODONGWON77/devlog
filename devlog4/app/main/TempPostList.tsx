"use client";
import React, { useState, useEffect } from "react";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import "react-quill/dist/quill.core.css"
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import { Quill } from "react-quill";
interface TempPostListProps {
  id: string;
}

const TempPostList = ({ id }: TempPostListProps) => {
  const [postList, setPostList] = useState<any>([]);
  const allFetch = createAllRestFetchByDevlog("post");
  useEffect(() => {
    const fetchPost = async () => {
      let res = await allFetch.getFetch("/");
      if (res.result && res.result.length == 0) {
        alert("조회된 결과가 없습니다");
      } else {
        setPostList(res.result);
      }
    };

    fetchPost();
  }, []);
  console.log("postList", postList);

  var quill = new Quill('#editor', {
    modules: {
      toolbar: false    // Snow includes toolbar by default
    },
    theme: 'snow'
  });

  return (
    <div>
      {postList.map((post:any, index:number)=>{
        return (
          <div key={`${post}${index}`} className="ql-snow">
            <div>{post.name}</div>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: post.htmlStr,
               }}></div>
          </div>
        )
      })}
    </div>
  );
};

export default TempPostList;
