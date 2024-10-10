"use client";

import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userNameState } from "../../recoil/state";
import Search from "./components/Search";
import { useSearch } from "./components/search-input/hooks/useSearch";
import { PostCard } from "app/service/detail/utils/schema";
import Card from "./components/Card";

interface ListProps {
  postCardList: PostCard[];
}

const List = ({ postCardList }: ListProps) => {
  const userName = useRecoilValue(userNameState);

  const {
    searchWord,
    searchResult,
    changeSearchWord,
    searchBarKeyUp,
  } = useSearch();
  return (
    <Fragment>
      <Search
        searchWord={searchWord}
        searchBarKeyUp={searchBarKeyUp}
        changeSearchWord={changeSearchWord}
        searchResult={searchResult}
      />
      <div className="flex flex-wrap flex-row justify-center w-full">
        {searchResult === null  
          ?  postCardList.map((postCard, index) => {
              return <div className="w-fit" key={index}><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
            })
          :  searchResult.length > 0 
            ? searchResult.map((postCard, index) => {
                return <div className="w-fit" key={index}><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
              })
            : <div>검색결과 없음</div>
        }
      </div>
    </Fragment>
  );
};

export default List;
