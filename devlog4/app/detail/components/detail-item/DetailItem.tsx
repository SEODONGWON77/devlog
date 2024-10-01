import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import HashtagList from "../hashtag-list";
import BookmarkButton from "../bookmark-button";
import LikeButton from "../like-button";
import EditButton from "../edit-button";
import Toc from "../toc/Toc";
import hljs from "highlightjs";
import "highlightjs/styles/vs2015.css";
import { v4 as uuidV4 } from "uuid";
import { useRecoilValue } from "recoil";
import { userEmailState, postState } from "../../../recoil/state";

interface DetailItemProps {
  detailIndex: number;
}

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});

const { buttonWrap, buttonStyle } = {
  buttonWrap: "inline-flex justify-between",
  buttonStyle: "px-3 py-1 text-sm font-semibold text-gray-700",
};

const DetailItem = ({ detailIndex }: DetailItemProps) => {
  const router = useRouter();
  const { title, name, taglist, createdt, updatedt, likedcounter, index, previewimageurl, htmlstr, email } = useRecoilValue(postState);
  const userEmail = useRecoilValue(userEmailState);
  const [actionId, setActionId] = useState<string>("init");
  const [isTocClick, setIsTocClick] = useState<boolean>(false);
  const tagList = taglist === "[]" ? JSON.parse(taglist) : taglist.slice(1, -1).split(",").map(tag => tag.replace(/"/g, ''));

  const onSetActionId = () => {
    setActionId(uuidV4());
  };

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
    <div className="w-full h-full flex" >
      <div className="w-full h-full">
        <div className="w-full">
          <div className="flex items-center py-2 h-[80px]">
            <h1 className="text-5xl font-bold">{title}</h1>
          </div>
          <div className="py-2">
            <span className="font-bold text-sky-400">{name}</span>
            {userEmail === email && <span className="float-right flex">{<EditButton deleteIndex={detailIndex} />}</span>}
          </div>
          <div className="py-2">
            <p>생성일자: {createdt}</p>
            <p>마지막 수정일자: {updatedt}</p>
          </div>
          <div className={buttonWrap}>
            {tagList.map((tag: string, index: number) => <HashtagList key={index} text={tag} order={index} />)}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="inline-flex items-center p-2">
            <div className="m-2">
              <BookmarkButton count={0} />
            </div>
            <div>
              <LikeButton count={likedcounter} _id={index} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <img src={previewimageurl}></img>
        </div>
        <div className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: htmlstr,
            }}
          />
        </div>
      </div>
      <div className="flex h-full items-center -mt-[10%]">
        <Toc handleIsTocClick={handleIsTocClick} key={actionId} />
      </div>
    </div>
  )
};

export default DetailItem;
