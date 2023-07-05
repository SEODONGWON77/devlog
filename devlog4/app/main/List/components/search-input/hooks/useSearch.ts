import axios from "axios";
import React, { useState, useEffect } from "react";

export function useSearch() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchOriginalWord, setSearchOriginalWord] = useState<string>("");
  const [enteringSearchWord, setEnteringSearchWord] = useState<string>("");
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>();

  const changeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOriginalWord(e.target.value);
    setSearchWord(e.target.value);
  };

  const searchBarKeyUp = (e: React.KeyboardEvent) => {
    if (searchWord === enteringSearchWord) {
      return;
    }
    setEnteringSearchWord(searchWord);
    setCurrentIdx(0);
  };

  const getPatentNumberMap = async (searchString: string) => {
    const { data } = await axios.post(`_search/`, {
      query: {
        bool: {
          must: [
            {
              term: {
                title: `${searchString}`,
              },
            },
          ],
        },
      },
    });
    if (data.hits.hits.length === 0) setIsSearch(false);
    else setIsSearch(true);

    const resultList: any[] = [];
    data.hits.hits.forEach((hit: any) => {
      resultList.push(hit._source);
    });
    return setSearchResult(resultList);
  };

  useEffect(() => {
    if (enteringSearchWord.length === 0) return;
    getPatentNumberMap(enteringSearchWord);
  }, [searchOriginalWord, enteringSearchWord]);
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
