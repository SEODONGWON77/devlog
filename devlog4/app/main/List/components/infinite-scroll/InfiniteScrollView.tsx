"use client"

import React, {useLayoutEffect, useEffect, useState, useRef, useCallback, use} from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

  const {
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    staleTime: 1000 * 60 * 60,
    queryKey: [`${propName}`],
    queryFn: ({ pageParam = 1 }) => fetchPage({ page: pageParam, count }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === count ? allPages.length + 1 : undefined;
    },
  });

  const fetchPage = async ({ page, count }: { page: number; count: number }) => {
    const from = ((page - 1) * count) + 1;
    const to = (page * count);
    try {
      const { response }: any = await fetcher({ from, to });
      return response ? JSON.parse(JSON.stringify(response)) : [];
    } catch (error) {
      console.error('Failed to fetch page', error);
      return [];
    }
  };

  const onScroll = useCallback(() => {
    const { innerHeight, scrollY } = window;
    const totalPageHeight = document.body.scrollHeight;
    const scrollPointCeiled = Math.ceil(scrollY + innerHeight);

    if (scrollPointCeiled >= totalPageHeight) {
      fetchNextPage();
    }
  }, [isFetchingNextPage]);
  
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    isSuccess && data?.pages.map((group, i) => {
      return React.cloneElement(children, {[propName]: {data: group, key: i}})
    })
  );
});

InfiniteScrollView.displayName = "InfiniteScrollView";
export default InfiniteScrollView;
