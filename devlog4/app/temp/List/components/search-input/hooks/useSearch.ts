import { searchPosts } from "app/lib/action";
import { PostCard } from "app/service/detail/utils/schema";
import React, { useState, useEffect, useCallback } from "react";

export function useSearch() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchOriginalWord, setSearchOriginalWord] = useState<string>("");
  const [enteringSearchWord, setEnteringSearchWord] = useState<string>("");
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<PostCard[] | null>(null);

  const changeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOriginalWord(e.target.value);
    setSearchWord(e.target.value);
    if(e.target.value === "") {
      setSearchResult(null)
    }
  };

  const searchBarKeyUp = (e: React.KeyboardEvent) => {
    if (searchWord === enteringSearchWord) {
      return;
    }
    setEnteringSearchWord(searchWord);
    setCurrentIdx(0);
  };

  const getSearchCardList = useCallback(
    debounce(async (searchString: string) => {
      if (searchString.length === 0) return;
      const res = await searchPosts(searchString);
      setSearchResult(res as PostCard[]);
    }, 1000),
    []
  );

  useEffect(() => {
    getSearchCardList(searchOriginalWord);
  }, [searchOriginalWord, getSearchCardList]);

  return {
    searchOriginalWord,
    searchWord,
    enteringSearchWord,
    changeSearchWord,
    searchBarKeyUp,
    isSearch,
    searchResult,
  };
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}