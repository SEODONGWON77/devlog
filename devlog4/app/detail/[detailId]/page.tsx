"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userEmailState, userNameState } from "../../recoil/state";

import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import { useQuery } from "@tanstack/react-query";
import HashtagList from "../components/hashtag-list";

const allFetch = createAllRestFetchByDevlog("post");

type Props = {
  params: any;
};

type Details = {
  title: any;
  htmlStr: any;
  index: any;
  shortContent: any;
  tagList: any[];
  updateDt: any;
  createDt: any;
};

const DetailId = ({ params: { detailId } }: Props) => {
  const userEmail = useRecoilValue(userEmailState);
  const userName = useRecoilValue(userNameState);

  const fetchPost = async () => {
    // let res = await allFetch.getFetch("", {
    //   index: detailId || index,
    // });
    let res = await allFetch.getFetch(`?index=${detailId}`);
    if (res.result && res.result.length == 0) {
      alert("조회된 결과가 없습니다");
    }

    const resultData = res.result;
    return resultData.length === 1
      ? resultData[0]
      : ((dataArray) => {
          dataArray.filter((item: any) => {
            if (item.index === detailId) return item;
          });

          return dataArray;
        })(resultData[0]);
  };

  const { data, isLoading, error } = useQuery(["posts"], fetchPost, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5000,
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
            if (item.index == detailId) {
              return item;
            }
          })[0]);

    return (
      details &&
      !loading && (
        <>
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
              <div>
                <div className="pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900">
                  <div className="flex px-3 py-2">
                    <svg className="mr-2.5 h-5 w-5 flex-none fill-slate-400">
                      <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"></path>
                    </svg>
                    Bookmark
                  </div>
                  <div className="border-l border-slate-400/20 px-2.5 py-2">
                    12k
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="adn ajm aql bac bbi bin bot bou bow bpf"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="nu rw"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-[100vh] bg-slate-400">
            <div
              // className="bg-white border-slate-100 border-b rounded-t-xl"
              dangerouslySetInnerHTML={{
                __html: details.htmlStr,
              }}
            />
          </div>
          <div className="w-full"></div>
        </>
      )
    );
  }
};

export default DetailId;

const { buttonWrap, buttonStyle } = {
  buttonWrap: "inline-flex justify-between",
  buttonStyle: "px-3 py-1 text-sm font-semibold text-gray-700",
};
