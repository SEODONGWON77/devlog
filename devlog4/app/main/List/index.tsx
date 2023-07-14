"use client";

import React, { useState, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Quill } from "react-quill";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import List from "./components/List";
import { useRecoilState, useRecoilValue } from "recoil";
import { postState, userNameState } from "../../recoil/state";
import { useQuery } from "@tanstack/react-query";
import Search from "./components/Search";
import { useSearch } from "./components/search-input/hooks/useSearch";
import { mainService } from "app/service/main";
import { MainResponse } from "app/service/main/utils/schema";

interface ListProps {
  data: MainResponse;
}

const fetchPost = async () => {
  const result = mainService.getMainResult();
  return result;
};

const Index = () => {
  const [postList, setPostList] = useRecoilState(postState);
  const [hasMore, setHasMore] = useState(true);
  const userName = useRecoilValue(userNameState);

  const { data, isLoading } = useQuery(["posts"], fetchPost, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: Infinity,
    retry: false,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: () => {
      if (data !== undefined) setPostList(String(data));
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
  const {
    searchOriginalWord,
    searchWord,
    changeSearchWord,
    searchBarKeyUp,
    enteringSearchWord,
    isSearch,
    searchResult,
  } = useSearch();

  return (
    <Fragment>
      <Search
        searchWord={searchWord}
        searchBarKeyUp={searchBarKeyUp}
        changeSearchWord={changeSearchWord}
        searchResult={searchResult}
      />
      {!isLoading && postList && (
        <InfiniteScroll
          {...infiniteScrollProps()}
          className="flex flex-wrap content-center justify-center"
        >
          <List
            posts={
              searchResult !== undefined && searchResult.length > 0
                ? searchResult
                : postList
            }
          />
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

export default Index;
