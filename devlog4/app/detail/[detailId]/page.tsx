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

const allFetch = createAllRestFetchByDevlog("post");

type Props = {
  params: any;
};

const DetailId = ({ params: { detailId } }: Props) => {
  const userEmail = useRecoilValue(userEmailState);
  const userName = useRecoilValue(userNameState);

  const fetchPost = async () => {
    // const result = await detailResultService.getSearchResult(detailId);
    // return result;
    let res = await allFetch.getFetch(`?index=${detailId}`);
    const result = validateGetSearchResult(res.result[0]);
    return result;
    // if (res.result && res.result.length == 0) {
    //   alert("조회된 결과가 없습니다");
    // }
    // const resultData = res.result;
    // return resultData.length === 1
    //   ? resultData[0]
    //   : ((dataArray) => {
    //       dataArray.filter((item: any) => {
    //         if (item.index === detailId) return item;
    //       });
    //       return dataArray;
    //     })(resultData[0]);
  };

  const { data, isLoading, error } = useQuery(["detail"], fetchPost, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
  });

  return (
    <DetailComponent
      loading={isLoading}
      {...data}
      detailIndex={detailId}
      email={userEmail}
      name={userName}
    />
  );

  function DetailComponent(detailData: any) {
    const { email, name, loading } = detailData;

    const details: any =
      !loading &&
      (detailData.index
        ? detailData
        : Object.values(detailData).filter((item: any) => {
            console.log("item", item);
            if (item.index == detailId) {
              return item;
            }
          })[0]);

    return (
      details &&
      !loading && (
        <div>
          <Toc />
          <div className="w-full">
            <div className="flex items-center py-2 h-[80px]">
              <h1 className="text-5xl font-bold">{details.title}</h1>
            </div>
            <div className="py-2">
              <span className="font-bold text-sky-400">{name}</span>
              <span className="font-bold"> · </span>
              <span>{email}</span>
            </div>
            <div className="py-2">
              <p>생성일자: {details.createDt}</p>
              {/* <span> / </span> */}
              <p>마지막 수정일자: {details.updateDt}</p>
            </div>
            <div className="py-2">
              <div className={buttonWrap}>
                {details.tagList.map((item: any, index: any) => <HashtagList text={item} order={index}/>)}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="inline-flex py-2">              
              <BookmarkButton count={0}/>
            </div>
          </div>
          <div className="w-full">
            <img src={details.previewImageUrl}></img>
          </div>
          <div className="w-full bg-slate-400">
            <div
              // className="bg-white border-slate-100 border-b rounded-t-xl"
              dangerouslySetInnerHTML={{
                __html: details.htmlStr,
              }}
            />
          </div>
        </div>
      )
    );
  }
};

export default DetailId;

const { buttonWrap, buttonStyle } = {
  buttonWrap: "inline-flex justify-between",
  buttonStyle: "px-3 py-1 text-sm font-semibold text-gray-700",
};
