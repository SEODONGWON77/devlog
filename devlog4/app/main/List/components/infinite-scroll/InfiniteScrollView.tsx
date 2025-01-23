"use client"

import React, { useLayoutEffect, useEffect, useState, useRef, useCallback, use } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRecoilValueLoadable } from "recoil";
import { searchListState } from "app/recoil/state";
import { PostCard } from "app/service/detail/utils/schema";

interface InfiniteScrollViewProps {
  View?: any;
  count?: any;
  propName: string;
  fetcher?: any;
  types?: any;
  children?: any;
}

const InfiniteScrollView = React.forwardRef<
  HTMLInputElement,
  InfiniteScrollViewProps
>(({ View, count, propName, fetcher, children }, ref): any => {

  const searchList = useRecoilValueLoadable(searchListState);
  const searchResult: PostCard[] = searchList.contents;

  const {
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    remove,
  } = useInfiniteQuery({
    staleTime: 1000 * 60 * 60,
    queryKey: [`${propName}`],
    queryFn: async ({ pageParam = 1 }) => {
      const from = ((pageParam - 1) * count) + 1;
      const to = (pageParam * count);

      try {
        const { response }: any = await fetcher({ from, to });
        return response ? JSON.parse(JSON.stringify(response)) : [];
      } catch (error) {
        console.error('Failed to fetch page', error);
        return [];
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === count ? allPages.length + 1 : undefined;
    },
  });

  const flattenedList = data?.pages.flatMap(page => page) || [];

  const comparedList = searchResult.length === 0
    ? flattenedList
    : searchResult.filter(result =>
      flattenedList.some(item => item.index === result.index)
    );

  const chunkedList = [];
  for (let i = 0; i < comparedList.length; i += count) {
    chunkedList.push(comparedList.slice(i, i + count));
  }

  const onScroll = useCallback(() => {
    const { innerHeight, scrollY } = window;
    const totalPageHeight = document.body.scrollHeight;
    const scrollPointCeiled = Math.ceil(scrollY + innerHeight);

    if (scrollPointCeiled >= totalPageHeight) {
      fetchNextPage();
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (searchResult.length > 0) {
      refetch({ refetchPage: () => true });
    }
  }, [searchResult])

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    isSuccess && chunkedList.map((group, i) => {
      return React.cloneElement(children, { [propName]: { data: group, key: i } })
    })
  );
});

InfiniteScrollView.displayName = "InfiniteScrollView";
export default InfiniteScrollView;
