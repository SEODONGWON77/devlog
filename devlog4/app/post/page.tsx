"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import {
  userEmailState,
  userNameState,
  postState,
  imageUrlListState,
} from "../recoil/state";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "../../styles/globals.css";
import Editor from "app/components/Editor";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import ThumbnailModal from "./components/thumbnail-modal/ThumbnailModal";
import { useSession } from "next-auth/react";
import { db, sql } from "@vercel/postgres";
import { newPost } from "app/lib/action";
import { deleteFile } from "app/components/utils";
import useCustomBack from "app/hooks/useCustomBack";
type Props = {
  searchParams: any;
};

function Post({ searchParams }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [htmlStr, setHtmlStr] = useState<string | null>(null);
  const tagList = useRef<string[]>([]);
  const [isThumbNailModalOpen, setIsThumbNailModalOpen] = useState(false);
  const { data } = useSession();

  // const postData: any = useRecoilValueLoadable(postState);
  // const loginUserName = useRecoilValueLoadable(userNameState);
  const imageUrlList = useRecoilValueLoadable(imageUrlListState);

  // useEffect(() => {
  //   // if (viewContainerRef.current) {
  //   //   viewContainerRef.current.innerHTML =
  //   //     "<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>";
  //   //   viewContainerRef.current.innerHTML += htmlStr;
  //   // }
  //   if (searchParams.edit && loginUserName) {
  //     setUserName(loginUserName as unknown as string);
  //     setTitle(postData.title);
  //     setHtmlStr(postData.htmlstr);
  //     tagList.current = postData.taglist;
  //   } else {
  //     setUserName(typeof data?.user?.name !== "string" ? "" : data?.user?.name);
  //   }
  // }, []);

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
    const obj = {
      name: userName,
      htmlStr,
      title,
      shortContent: shortIntrodution,
      tagList: tagList.current,
      previewImageUrl,
    };

    newPost(obj);
    // try {
    //   const client = await db.connect();
    //   const data =
    //     await client.sql`INSERT INTO post (name, htmlStr, title, shortContent, createDt, updateDt, index, tagList, previewImageUrl, likedCounter)
    //   VALUES ('111', '<html>Content 111</html>', 'Sample Title 1', 'Short content 1', '2024-01-11', '2024-01-11', 4, 'tag1, tag2', 'image_url_1', 0),`;
    //   await allFetch.postFetch("", {
    //     name: userName,
    //     htmlStr,
    //     title,
    //     shortContent: shortIntrodution,
    //     tagList: tagList.current,
    //     previewImageUrl,
    //   });
    //   alert("저장되었습니다.");
    //   handleCloseModal();
    //   router.push("/main");
    // } catch (error) {
    //   console.log("error", error);
    // }
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

  //새로고침용
  // const handleBeforeUnload = useCallback(
  //   (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     if (imageUrlList.state === "hasValue") {
  //       const imageUrlStringList = imageUrlList.contents;
  //       if (imageUrlStringList.length > 0)
  //         imageUrlStringList.forEach((imageString) => {
  //           const fileName: string = imageString.split("upload/")[1];
  //           deleteFile(fileName);
  //         });
  //     }
  //     router.back();
  //   },
  //   [imageUrlList, router]
  // );

  const handleBack = () => {
    if (imageUrlList.state === "hasValue") {
      const imageUrlStringList = imageUrlList.contents;
      if (imageUrlStringList.length > 0) {
        Promise.all(
          imageUrlStringList.map((imageString) => {
            const fileName: string = imageString.split("upload/")[1];
            return deleteFile(fileName);
          })
        )
          .then(() => {
            router.push("/main");
          })
          .catch((error) => {
            console.error("에러:", error);
          });
      } else {
        router.push("/main");
      }
    }
  };
  useCustomBack(handleBack);

  return (
    <div className="w-full mt-10">
      <div className="m-auto w-[1544px] mb-2">
        <input
          className="w-[500px] h-[50px] outline-none text-4xl"
          type="text"
          placeholder="제목을 입력하세요."
          value={title}
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
        editMode={searchParams.edit}
      />
    </div>
  );
}

export default Post;
