"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userEmailState, userNameState } from "../../recoil/state";

import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import { useQuery } from "@tanstack/react-query";

import HashtagList from "../components/hashtag-list";

import { detailResultService } from "app/service/detail";
import { validateGetSearchResult } from "app/service/detail/utils/validate";
import Toc from "../components/toc/Toc";

import BookmarkButton from "../components/bookmark-button";
import { DetailResult } from "app/service/detail/utils/schema";
import DetailItem from "../components/detail-item/DetailItem";

const allFetch = createAllRestFetchByDevlog("post");

type Props = {
  params: any;
};

const DetailId = ({ params: { detailId } }: Props) => {
  const userEmail = useRecoilValue(userEmailState);
  const userName = useRecoilValue(userNameState);
  const fetchPost = async () => {
    let res = await allFetch.getFetch(`?index=${detailId}`);
    const result = validateGetSearchResult(res.result[0]);
    return result;
  };

  const { data, isLoading, error, refetch } = useQuery(["detail"], fetchPost, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    cacheTime: 0,
    staleTime: 0,
  });

  return (
    <DetailItem
      loading={isLoading}
      data={data}
      detailIndex={detailId}
      email={userEmail}
      name={userName}
    />
  );
};

export default DetailId;