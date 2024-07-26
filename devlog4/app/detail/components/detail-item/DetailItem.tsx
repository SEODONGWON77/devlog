import React, { useEffect, useState, useCallback } from "react";
import { PostCard } from "app/service/detail/utils/schema";
import { useRouter } from "next/navigation";
import HashtagList from "../hashtag-list";
import BookmarkButton from "../bookmark-button";
import LikeButton from "../like-button";
import EditButton from "../edit-button";
import Toc from "../toc/Toc";
import hljs from "highlightjs";
import "highlightjs/styles/vs2015.css";

import { useRecoilValue } from "recoil";
import { userEmailState, userNameState, postState } from "../../../recoil/state";
import { v4 as uuidV4 } from "uuid";

interface DetailItemProps {
  // loading: boolean;
  data?: PostCard;
  detailIndex: any;
  email: string;
  name: string;
}

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});

const DetailItem = (detailData: DetailItemProps) => {
  // const { email, name, loading, detailIndex, data } = detailData;
  const uuid = uuidV4();
  const [actionId, setActionId] = useState<string>("init");
  const [coreSet, setCoreSet] = useState<Set<string>>(new Set());

  const onSetActionId = () => {
    setActionId(uuidV4());
  };
  const { email, name, detailIndex } = detailData;

  const data: any = useRecoilValue(postState);

  const userEmail: any = useRecoilValue(userEmailState);
  const userName: any = useRecoilValue(userNameState);

  const [isTocClick, setIsTocClick] = useState<boolean>(false);

  // const details: any =
  //   // !loading &&
  //   (data?.index
  //     ? data
  //     : Object.values(detailData).filter((item: any) => {
  //         if (item.index == detailIndex) {
  //           return item;
  //         }
  //       })[0]);

  const router = useRouter();

  const handleIsTocClick = useCallback(() => {
    setIsTocClick(true);
  }, [isTocClick]);

  useEffect(() => {
    const handlePopstate = () => {
      if (!isTocClick) router.push("/main");
      else setIsTocClick(false);
    };
    onSetActionId();
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [handleIsTocClick]);

  return (
    // details &&
    //!loading &&
    data && (
      <div>
        <Toc handleIsTocClick={handleIsTocClick} key={actionId} />
        <div className="w-full">
          <div className="flex items-center py-2 h-[80px]">
            <h1 className="text-5xl font-bold">{data.title}</h1>
          </div>
          <div className="py-2">
            <span className="font-bold text-sky-400">{data.name}</span>
            <span className="float-right flex">{/* useEmail 로 변경할 부분!!! */userName == data.name && <EditButton deleteIndex={detailIndex}/>}</span>
          </div>
          <div className="py-2">
            <p>생성일자: {data.createdt}</p>
            {/* <span> / </span> */}
            <p>마지막 수정일자: {data.updatedt}</p>
          </div>
          <div className="py-2">
            {/* <div className={buttonWrap}>
              {data.taglist.map((item: any, index: any) => (
                <HashtagList key={index} text={item} order={index} />
              ))}
            </div> */}
            <div className={buttonWrap}>
              {((tagList = []) => {
                return (
                  tagList.length &&
                  tagList
                    .split(",")
                    .map((item: any, index: any) => (
                      <HashtagList key={index} text={item} order={index} />
                    ))
                );
              })(data.taglist)}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="inline-flex items-center p-2 ">
            <div className="m-2">
              <BookmarkButton count={0} />
            </div>
            <div>
              <LikeButton count={data.likedcounter} _id={data.index} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <img src={data.previewimageurl}></img>
        </div>
        <div className="w-full">
          <div
            // className="bg-white border-slate-100 border-b rounded-t-xl"
            dangerouslySetInnerHTML={{
              __html: data.htmlstr,
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
