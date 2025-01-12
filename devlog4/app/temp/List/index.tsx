"use client"

import React, { Fragment } from "react";
import { PostCard } from "app/service/detail/utils/schema";
import Card from "./components/Card";

interface ListProps {
  postCardList: PostCard[],
}

const List = ({
  postCardList
}: ListProps) => {

  return (
    <Fragment>
      <div className="w-full flex flex-wrap flex-row justify-center" >
        {postCardList.length > 0
          ? postCardList.map((postCard, index) => {
            return <div key={`${index}`} className="w-fit"><Card key={`${postCard.createdt}${index}`} card={postCard} /></div>;
          })
          : <div>검색결과 없음</div>
        }
      </div>
    </Fragment>
  );
};

export default List;
