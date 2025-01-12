"use client"

import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userNameState, searchListState} from "../../recoil/state";
import { useSearch } from "./components/search-input/hooks/useSearch";
import { PostCard } from "app/service/detail/utils/schema";
import Card from "./components/Card";
import Search from "./components/Search";

interface PostCardListProps {
  data: PostCard[];
  key: number;
}
interface ListProps {
  postCardList: PostCardListProps,
}

const devideWidth = {
  4: `w-[80%] grid grid-cols-4 gap-4`,
  3: `w-[80%] grid grid-cols-3 gap-4`,
  2: `w-[80%] grid grid-cols-2 gap-4`,
  1: `w-[80%] grid grid-cols-1 gap-4`,
}

const List = ({
  postCardList = {data: [], key: 1},
}: ListProps) => {

  const { data, key }: PostCardListProps = postCardList;
  const searchList = useRecoilValueLoadable(searchListState);
  const searchResult: PostCard[] = searchList.contents;
  const [gridCols, setGridCols] = useState(devideWidth[4]);

  const handleGridCols = () => {
    const { innerWidth, scrollY } = window;
    if (innerWidth >= 1550) {
      setGridCols(devideWidth[4]);
    } else if (innerWidth < 1550 && innerWidth > 780) {
      setGridCols(devideWidth[2]);
    } else {
      setGridCols(devideWidth[1]);
    }
  };

  const onResize = useCallback(handleGridCols, []);

  useEffect(() => {
    handleGridCols();
    
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Fragment>
      <div className={gridCols} key={key}>
      {/* <div className="w-full flex flex-wrap flex-row justify-center" key={key}> */}
        {!searchResult.length 
          ?  data.map((postCard, index) => {
              // return <div key={`${index}`} className="w-fit"><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
              return <div key={`${index}`} className="w-full flex flex-wrap justify-center items-center"><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
            })
          :  searchResult.length > 0 
            ? searchResult.map((postCard: PostCard, index: number) => {
                // return <div key={`${index}`} className="w-fit"><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
                return <div key={`${index}`} className="w-full flex flex-wrap justify-center items-center"><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
              })
            : <div>검색결과 없음</div>
        }
      </div>
    </Fragment>
  );
};

export default List;
