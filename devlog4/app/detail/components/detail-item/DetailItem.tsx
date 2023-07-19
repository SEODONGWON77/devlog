import React, { useEffect, useState, useCallback } from "react";
import { DetailResult } from "app/service/detail/utils/schema";
import { useRouter } from "next/navigation";
import HashtagList from "../hashtag-list";
import BookmarkButton from "../bookmark-button";
import Toc from "../toc/Toc";

interface DetailItemProps {
  loading: boolean;
  data?: DetailResult;
  detailIndex: any;
  email: string;
  name: string;
}

const DetailItem = (detailData: DetailItemProps) => {
  const { email, name, loading, detailIndex, data } = detailData;
  const [isTocClick, setIsTocClick] = useState<boolean>(false);

  const details: any =
    !loading &&
    (data?.index
      ? data
      : Object.values(detailData).filter((item: any) => {
          console.log("item", item);
          if (item.index == detailIndex) {
            return item;
          }
        })[0]);

  const router = useRouter();

  const handleIsTocClick = useCallback(() => {
    setIsTocClick(true);
  }, [isTocClick]);

  useEffect(() => {
    const handlePopstate = () => {
      if (!isTocClick) router.push("/main");
      else setIsTocClick(false);
    };
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [handleIsTocClick]);

  return (
    details &&
    !loading && (
      <div>
        <Toc handleIsTocClick={handleIsTocClick} />
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
              {details.tagList.map((item: any, index: any) => (
                <HashtagList key={index} text={item} order={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="inline-flex py-2">
            <BookmarkButton count={0} />
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
};

export default DetailItem;

const { buttonWrap, buttonStyle } = {
  buttonWrap: "inline-flex justify-between",
  buttonStyle: "px-3 py-1 text-sm font-semibold text-gray-700",
};
