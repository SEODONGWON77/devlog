"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userEmailState, userNameState } from "../../recoil/state";

import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import { useQuery } from "@tanstack/react-query";
const allFetch = createAllRestFetchByDevlog("post");


const fetchPost = async () => {
  let res = await allFetch.getFetch("/");
  if (res.result && res.result.length == 0) {
    alert("조회된 결과가 없습니다");
  }
  return res.result;
};

type Props = {
  params: any
};

const DetailId = ({params: {detailId}}: Props) => {

  const [id, setId] = useState("");
  const userEmail = useRecoilValue(userEmailState);
  const userName = useRecoilValue(userNameState);

  const { data, isLoading, error } = useQuery(["posts"], fetchPost, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5000,
    cacheTime: Infinity,
  });

  console.log('콘솔 data', data);

  useEffect(() => {
    setId(detailId);
    console.log('콘솔 detailId', id);
    console.log('콘솔 userEmail', userEmail, '&&& userName', userName);
  }, []);

  return (
    <div className="bg-slate-300 space-y-2 p-2 border-4 border-blue-400">
      <div>Id: {id}</div>
      <div>Email: {userEmail}</div>
      <div>Name: {userName}</div>
    </div>
  );
}

export default DetailId;
