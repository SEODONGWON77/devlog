import React, { useEffect } from "react";
import { NextPage } from "next";
import AWS from "aws-sdk";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RangeStatic } from "quill";
import dayjs from "dayjs";
import hljs from "highlightjs";
import "highlightjs/styles/vs2015.css";
import { uploadFile } from "./utils";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { imageUrlListState } from "app/recoil/state";

interface IEditor {
  htmlStr: string | null;
  handleHtmlStr: (currentHtmlStr: string) => void;
}

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});

const Editor = ({ htmlStr, handleHtmlStr }: IEditor) => {
  const quillRef = React.useRef<ReactQuill>(null);
  const prevImageUrlList = useRecoilValue(imageUrlListState);
  const setImageUrlList = useSetRecoilState(imageUrlListState);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        const fileExt = file[0].name.split(".").pop();
        if (
          file[0].type === "image/jpeg" ||
          fileExt === "jpg" ||
          file[0].type === "image/png" ||
          fileExt === "png"
        ) {
          const fileId = dayjs().format("YYYYMMDDHHmmssSSS");
          const fileName = `${fileId}_${file[0].name}`;
          const res = await uploadFile(file[0], fileName);
          if (res) {
            setImageUrlList((prevList) => [...prevList, res.Location]);
          }
          if (quillRef.current) {
            const index = (
              quillRef.current.getEditor().getSelection() as RangeStatic
            ).index;

            const quillEditor = quillRef.current.getEditor();
            quillEditor.setSelection(index, 1);
            quillEditor.clipboard.dangerouslyPasteHTML(
              index,
              `<img src="${res.Location}" alt=${res.Key} />`
            );
          }
        } else {
          alert("jpg, png 파일만 Upload 가능합니다.");
          return;
        }
      }
    };
  };

  // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
  const modules = React.useMemo(
    () => ({
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: [
          [{ font: [] }], // font 설정
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ], // 리스트, 인덴트 설정
          ["link", "image"], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
          // ["clean"], // toolbar 설정 초기화 설정
        ],

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    []
  );

  // toolbar에 사용되는 tool format
  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "formula",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      formats={formats}
      value={htmlStr === null ? "" : htmlStr}
      placeholder="내용을 입력하세요."
      onChange={(
        content: any,
        delta: any,
        source: any,
        editor: { getHTML: () => string }
      ) => handleHtmlStr(editor.getHTML())}
    />
  );
};

export default Editor;
