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
import { DetailResult } from "app/service/detail/utils/schema";

interface ListProps {
  data: MainResponse;
}

const fetchPost = async () => {
  //temp
  const tempResult = await mainService.getTempResult();
  const tempResult2 = await mainService.getTempResult2();
  console.log("tempResult", tempResult);
  console.log("tempResult2", tempResult2);
  const result = mainService.getMainResult();

  return result;
};

const Index = () => {
  // const [postList, setPostList] = useRecoilState<any[]>(postState);
  const [hasMore, setHasMore] = useState(true);
  const userName = useRecoilValue(userNameState);

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
      {!isLoading && detailList && (
        <InfiniteScroll
          {...infiniteScrollProps()}
          className="flex flex-wrap content-center justify-center"
        >
          <List
            posts={
              searchResult !== undefined && searchResult.length > 0
                ? searchResult
                : detailList
            }
          />
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

export default Index;
