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
import { useRouter } from 'next/navigation';
type Props = {};

function Post({}: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userName = useRecoilValue(userNameState);
  const userEmail = useRecoilValue(userEmailState);

  const [title, setTitle] = useState("");
  const [shortContent, setShortContent] = useState("");
  const allFetch = createAllRestFetchByDevlog("post");
  const [htmlStr, setHtmlStr] = useState<string>("");
  const viewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      allFetch.getFetch("/");
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML =
        "<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>";
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  const submitHandler = async () => {
    try {
      await allFetch.postFetch("/", {
        userName,
        htmlStr,
        title,
        shortContent,
      });
      alert("저장되었습니다.");
      router.push("/main");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center gap-2 mb-2">
        <div className="ql-snow w-[768px]">
          <div className="my-2">WRITING</div>
          <div className="flex">
            <span>제목 : </span>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="flex">
            <span>소개 : </span>
            <input
              type="text"
              onChange={(e) => setShortContent(e.target.value)}
            />
          </div>
          <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        </div>
        <div className="ql-snow w-[768px] h-[300px]">
          <div className="my-2">PREVIEW</div>
          <div
            className="ql-editor bg-slate-100"
            dangerouslySetInnerHTML={{
              __html: htmlStr,
            }}
          />
        </div>
      </div>
      <div className="m-auto w-[1544px]">
        <div className="flex border p-4 w-full items-center">
          <div className="">
            <input placeholder="태그를 입력하세요."></input>
          </div>
          <div className="ml-auto">
            <button onClick={() => submitHandler()}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
