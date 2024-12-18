"use client"

import React, { Fragment } from "react";
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

const List = ({
  postCardList = {data: [], key: 1},
}: ListProps) => {

  const { data, key }: PostCardListProps = postCardList;
  const searchList = useRecoilValueLoadable(searchListState);
  const searchResult: PostCard[] = searchList.contents;

  return (
    <Fragment>
      <div className="w-full flex flex-wrap flex-row justify-center" key={key}>
        {!searchResult.length 
          ?  data.map((postCard, index) => {
              return <div key={`${index}`} className="w-fit"><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
            })
          :  searchResult.length > 0 
            ? searchResult.map((postCard: PostCard, index: number) => {
                return <div key={`${index}`} className="w-fit"><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
              })
            : <div>검색결과 없음</div>
        }
      </div>
    </Fragment>
  );
};

export default List;
