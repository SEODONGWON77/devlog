
import React, {  } from "react";
import { useRouter } from 'next/navigation';

type Props = {
  params: any
};

const DetailId = ({params: {detailId}}: Props) => {
  return (
    <div className="bg-slate-300 space-y-2 p-2 border-4 border-blue-400">
      <div>params: {detailId}</div>
    </div>
  );
}

export default DetailId;
