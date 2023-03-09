"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState, userNameState } from "../recoil/state";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import "react-quill/dist/quill.bubble.css";
import Editor from "app/components/Editor";
type Props = {};

function Post({}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userName = useRecoilValue(userNameState);
  const userEmail = useRecoilValue(userEmailState);

  const [password, setPassword] = useState("");
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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await allFetch.postFetch("/", {
        userName,
        htmlStr,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="bg-cyan-400">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="w-[1200px] h-screen">
          <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        </div>
        <div className="col-10 col-lg-5 ">
          <form
            className="border border-secondary rounded p-4"
            onSubmit={submitHandler}
          >
            <button
              type="submit"
              className="btn btn-block w-100 btn-primary btn-block mb-4"
            >
              등록등록등록등록등록등록등록등록등록등록등록등록등록등록등록등록등록
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
