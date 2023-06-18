"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState, userNameState } from "../recoil/state";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "../../styles/globals.css";
import Editor from "app/components/Editor";
import { useRouter } from "next/navigation";
import ThumbnailModal from "./components/thumbnail-modal/ThumbnailModal";
import { useSession } from "next-auth/react";

type Props = {};

function Post({}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [htmlStr, setHtmlStr] = useState<string | null>(null);
  const allFetch = createAllRestFetchByDevlog("post");
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const tagList = useRef<string[]>([]);
  const [isThumbNailModalOpen, setIsThumbNailModalOpen] = useState(false);
  const { data } = useSession();
  const userName: string =
    typeof data?.user?.name !== "string" ? "" : data?.user?.name;
  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML =
        "<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>";
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  const onChangeHandler = (text: string) => {
    const modifyText = text.replace(/\s+/g, " ");
    tagList.current = getSplitTagList(modifyText);
  };

  const getSplitTagList = (text: string) => {
    if (text.trim() === "") {
      return [];
    }
    const filteredTextList = Array.from(
      new Set(
        text
          .replace(/\n/g, " ")
          .replace(/;/g, " ")
          .split(" ")
          .filter((element) => element !== "")
      )
    );

    return filteredTextList;
  };

  const handleSubmit = async (
    previewImageUrl: string,
    shortIntrodution: string
  ) => {
    try {
      await allFetch.postFetch("", {
        name: userName,
        htmlStr,
        title,
        shortContent: shortIntrodution,
        tagList: tagList.current,
        previewImageUrl,
      });
      alert("저장되었습니다.");
      handleCloseModal();
      router.push("/main");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseModal = () => {
    setIsThumbNailModalOpen(false);
  };

  const handleHtmlStr = (currentHtmlStr: string) => {
    setHtmlStr(currentHtmlStr);
  };

  const onClickThumbnailModalOpen = () => {
    if (title === null || title.length === 0)
      return alert("타이틀이 입력되지 않았습니다.");
    setIsThumbNailModalOpen(true);
  };
  return (
    <div className="w-full mt-10">
      <div className="m-auto w-[1544px] mb-2">
        <input
          className="w-[500px] h-[50px] outline-none text-4xl"
          type="text"
          placeholder="제목을 입력하세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex w-full gap-2">
          <div className="ql-snow w-[768px]">
            <div className="my-2">WRITING</div>
            <Editor htmlStr={htmlStr} handleHtmlStr={handleHtmlStr} />
          </div>
          <div className="ql-snow w-[768px] h-[693px]">
            <div className="my-2">PREVIEW</div>
            <div
              className="ql-editor bg-slate-50  border border-solid border-lightGray-20"
              dangerouslySetInnerHTML={{
                __html: htmlStr === null ? "" : htmlStr,
              }}
            />
          </div>
        </div>
      </div>
      <div className="m-auto w-[1544px]">
        <div className="flex border p-4 w-full items-center">
          <input
            className="w-[90%] outline-none"
            placeholder="태그를 추가해보세요. *띄어쓰기 또는 세미콜론(;)으로 구분해서 입력해주세요."
            onChange={(e) => onChangeHandler(e.target.value)}
          ></input>
          <div className="ml-auto">
            <button onClick={onClickThumbnailModalOpen}>다음</button>
          </div>
        </div>
      </div>
      <ThumbnailModal
        isThumbNailModalOpen={isThumbNailModalOpen}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        title={title}
        userName={userName}
      />
    </div>
  );
}

export default Post;
