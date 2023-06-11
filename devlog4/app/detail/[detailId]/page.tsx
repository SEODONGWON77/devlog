"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userEmailState, userNameState } from "../../recoil/state";

type Props = {
  params: any
};

const DetailId = ({params: {detailId}}: Props) => {

  const [id, setId] = useState("");
  const userEmail = useRecoilValue(userEmailState);
  const userName = useRecoilValue(userNameState);

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

