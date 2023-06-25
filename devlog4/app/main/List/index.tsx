"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Quill } from "react-quill";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import List from "./components/List";
import { useRecoilState, useRecoilValue } from "recoil";
import { postState, userEmailState, userNameState } from "../../recoil/state";
import { useQuery } from "@tanstack/react-query";
const allFetch = createAllRestFetchByDevlog("post");

const fetchPost = async () => {
  let res = await allFetch.getFetch("/");
  if (res.result && res.result.length == 0) {
    alert("조회된 결과가 없습니다");
  }
  return res.result;
};

const Index = () => {
  const [postList, setPostList] = useRecoilState(postState);
  const [hasMore, setHasMore] = useState(true);
  const userName = useRecoilValue(userNameState);

  const { data, isLoading, error } = useQuery(["posts"], fetchPost, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 60 * 1000,
    cacheTime: Infinity,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (data) => {
      console.log("data", data);
      setPostList(data);
    },
  });

  const infiniteScrollProps: any = () => {
    const Component = {
      loading: () => <h3> Loading...</h3>,
      endMessage: () => <h4>Nothing more to show</h4>,
    };
    return {
      dataLength: postList.length,
      next: fetchPost,
      hasMore: hasMore,
      loader: Component.loading(),
      endMessage: Component.endMessage(),
    };
  };
  console.log("data", data);
  console.log("postList", postList);
  return (
    <>
      {!isLoading && postList && (
        <InfiniteScroll
          {...infiniteScrollProps()}
          className="flex flex-wrap content-center justify-center"
        >
          <List posts={postList} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default Index;
