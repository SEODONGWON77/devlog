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

  const loadingRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1)
  const [fetchData, setFetchData] = useState(false);
  const [stopFetch, setStopFetch] = useState(false);

  //const [posts, setPosts] = useState<any>([]);
  //const [isFetching, setIsFetching] = useState(false);
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
    queryFn: ({pageParam = 1}) => fetchPage({page: pageParam, count}),
    getNextPageParam: (lastPage: any, allPages: any) => {
      // console.log('콘솔 lastPage: ', lastPage, ', allPages: ', allPages);
      const resultCount = (lastPage.length / count)  + 1;
      return resultCount;
    },
  });
  
  const fetchPage = async ({page, count}: any) => {
    console.log('page: ', page, ', count: ', count);

    setPage(page);

    const from = (page - 1) * count || 1, to = (page * count);
    console.log('from: ', page, ', to: ', count);

    const {response}: any = await fetcher({from, to});
    return JSON.parse(JSON.stringify(response));
  };

  const onScroll = useCallback(() => {
    const { innerHeight, scrollY } = window;
    const totalPageHeight = document.body.scrollHeight;
    const scrollPointCeiled = Math.ceil(scrollY + innerHeight);

    if (scrollPointCeiled >= totalPageHeight) {
      console.log('Scroll on the floor ');
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
