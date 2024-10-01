"use client";

import React from "react";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import DetailItem from "../components/detail-item/DetailItem";

interface Props  {
  params: {
    detailId: string;
  };
};

const DetailId = ({ params: { detailId } }: Props) => {
  return (
    <DetailItem
      detailIndex={Number(detailId)}
    />
  );
};

export default DetailId;
