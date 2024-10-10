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
>(({ View, count, propName, fetcher, types, children }, ref) => {
  const [scrollHeight, setScrollHeight] = useState(document.body.scrollHeight);
  const [scrollPoint, setScrollPoint] = useState(0);
  const [fetchTimes, setFetchTimes] = useState(1);
  const [fetchCount, setFetchCount] = useState(1);
  const [fetchData, setFetchData] = useState(false);
  //const [posts, setPosts] = useState<any>([]);
  //const [isFetching, setIsFetching] = useState(false);

  const onScroll = useCallback(() => {
    const { innerHeight, scrollY } = window;

    setScrollHeight(document.body.scrollHeight);
    setScrollPoint(scrollY + innerHeight);

    if (scrollPoint >= scrollHeight) {
      console.log('스크롤 바닥옴');
      // 테스트: 임시로 pageParam 16 지정
      hasNextPage && fetchNextPage({pageParam: 16});
    }

  }, []);
  
  const fetchPage = async ({page}: any) => {
    const {response}: any = await fetcher(page);
    console.log('page: ', page, 'response: ', response);
    return JSON.parse(JSON.stringify(response));
  };

  const nextFetchPage = (lastPage: any, allPages: any) => {
    // const nextFetchPage = lastPage.length * fetchTimes;
    // console.log('콘솔 nextFetchPage: ', nextFetchPage);
    console.log('콘솔 lastPage: ', lastPage, ', allPages: ', allPages);
    return lastPage.length;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isSuccess,
    isRefetching,
    isFetching,
    isFetchingNextPage,
    status,
  }  = useInfiniteQuery({
    staleTime: 1000 * 60 * 60,
    queryKey: [`${propName}`],
    queryFn: ({pageParam = count}) => fetchPage({page: pageParam}),
    getNextPageParam: nextFetchPage,
  });

  useEffect(() => {
    setFetchData(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {
        (isSuccess || isFetchingNextPage) && data?.pages.map((group, i) => {
          return React.cloneElement(children, {[propName]: group}) 
        })
      }
    </>
  );
});

InfiniteScrollView.displayName = "InfiniteScrollView";
export default InfiniteScrollView;
