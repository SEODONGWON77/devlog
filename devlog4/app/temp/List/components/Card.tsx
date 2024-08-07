"use client";
import { PostCard } from "app/service/detail/utils/schema";
import React, { useEffect } from "react";
import Gallery from "./Gallery";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { postState, useSsrComplectedState } from "app/recoil/state";

interface Props {
  card: PostCard;
}

const Card = ({
  card,
  card: {
    createdt,
    htmlstr,
    index,
    likedcounter,
    name,
    email,
    shortcontent,
    taglist,
    title,
    updatedt,
    previewimageurl,
  },
}: Props) => {
  const router = useRouter();
  const setPostState = useSetRecoilState(postState);

  const moveToDetail = (index: number) => {
    setPostState(card);
    router.push(`/detail/${index}`);
  };

  //csr에서 ssr data 기다린후 실행하기위해
  const setSsrCompleted = useSsrComplectedState();
  useEffect(setSsrCompleted, [setSsrCompleted]);

  return (
    <button
      key={`${index}${title}`}
      className="cursor-pointer m-7 w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      onClick={() => moveToDetail(index)}
    >
      <div>
        <Gallery url={previewimageurl} alt={`product-${index}`} />
        <div className="p-5">
          <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {shortcontent}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{createdt}</p>
        </div>
      </div>
    </button>
  );
};

export default Card;
