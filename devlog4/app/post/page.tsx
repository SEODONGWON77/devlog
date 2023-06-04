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

type Props = {};

function Post({}: Props) {
  const router = useRouter();
  const userName = useRecoilValue(userNameState);
  const [title, setTitle] = useState("");
  const [shortContent, setShortContent] = useState("");
  const allFetch = createAllRestFetchByDevlog("post");
  const [htmlStr, setHtmlStr] = useState<string>("");
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const tagList = useRef<string[]>([]);
  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML =
        "<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>";
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  const submitHandler = async () => {
    try {
      await allFetch.postFetch("", {
        userName,
        htmlStr,
        title,
        shortContent,
        tagList: tagList.current,
      });
      alert("저장되었습니다.");
      router.push("/main");
    } catch (error) {
      console.log("error", error);
    }
  };

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

  return (
    <div className="w-full mt-10">
      <div className="flex justify-center gap-2 mb-2">
        <div className="ql-snow w-[768px]">
          <div className="flex gap-2 items-center h-10">
            <span>제목 : </span>
            <input
              className="w-[500px] outline-none"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center h-10">
            <span>소개 : </span>
            <input
              className="w-[500px] outline-none"
              type="text"
              onChange={(e) => setShortContent(e.target.value)}
            />
          </div>
          <div className="my-2">WRITING</div>
          <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        </div>
        <div className="ql-snow w-[768px] h-[774px]">
          <div className="my-2">PREVIEW</div>
          <div
            className="ql-editor bg-slate-50  border border-solid border-lightGray-20"
            dangerouslySetInnerHTML={{
              __html: htmlStr,
            }}
          />
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
            <button onClick={() => submitHandler()}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
