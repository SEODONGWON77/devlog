"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Quill } from "react-quill";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import List from "./components/List";
import { useRecoilValue } from "recoil";
import { userEmailState, userNameState } from "../../recoil/state";
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
  const [postList, setPostList] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const userName = useRecoilValue(userNameState);

  const { data, isLoading, error } = useQuery(["posts"], fetchPost, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5000,
    cacheTime: Infinity,
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
  
  return (
    <>
      {!isLoading && data && (
        <InfiniteScroll
          {...infiniteScrollProps()}
          className="flex flex-wrap content-center justify-center"
        >
          <List posts={data} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default Index;
