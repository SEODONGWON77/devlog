"use client";

import React, { useState, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Quill } from "react-quill";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
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
  // const [postList, setPostList] = useRecoilState<any[]>(postState);
  const [hasMore, setHasMore] = useState(true);
  const userName = useRecoilValue(userNameState);

  const { data, isLoading, error } = useQuery(["posts"], fetchPost, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5000,
    cacheTime: Infinity,
  });

  const { data: detailList, isLoading } = useQuery(["posts"], fetchPost, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: Infinity,
    retry: false,
    onError: (error) => {
      console.log("error", error);
    },
    // onSuccess: () => {
    //   console.log("detailList", detailList);
    // },
  });
  const infiniteScrollProps: any = () => {
    const Component = {
      loading: () => <h3> Loading...</h3>,
      endMessage: () => <h4>Nothing more to show</h4>,
    };
    return {
      dataLength: detailList?.length,
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
    </Fragment>
  );
};

export default Index;
