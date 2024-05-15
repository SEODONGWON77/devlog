"use client";
import React, { useEffect, useState } from "react";
import TocView from "./TocView";

interface TocProps {
  handleIsTocClick: () => void;
}

const Toc = ({ handleIsTocClick }: TocProps) => {
  // 목차 리스트 ( index: 목차, size: 목차의 크기 ( h1~h6는 크기를 다르게 렌더링해주기 위함 ) )
  const [indexList, setIndexList] = useState<{ index: string; size: number }[]>(
    []
  );
  // 현재 보이는 목차 ( 강조 표시 해주기 위함 )
  const [currentIndex, setCurrentIndex] = useState<string>("");

  useEffect(() => {
    // 1. <main> 내부에서만 목차를 만들거라서 <main> 선택
    // 2. <h1>, <h2>, <h3> 찾기
    const headingElements = Array.from(document.querySelectorAll("h1, h2, h3"));
    const hNodeList = document
      .querySelector("*")
      ?.querySelectorAll("h1, h2, h3") as NodeListOf<Element>;
    // IntersectionObserver들이 들어갈 배열 ( 이벤트 해제를 위해 )
    const IOList: IntersectionObserver[] = [];
    let IO: IntersectionObserver;

    // 만약 여기서 오류가 난다면 "spread opeartor"는 es6부터 지원되는 문법이라서 그 이전에 사용하기 위해서는 "downlevelIteration"에 대해서 찾아보면 된다.
    [...hNodeList].forEach((node) => {
      // 목차 내용이랑 사이즈 구해서 저장
      const index = node.textContent as string;
      const size = (+node.nodeName[1] - 1) * 20;
      setIndexList((prev) => {
        if (prev.map((v) => v.index).includes(index)) return prev;
        return [...prev, { index, size }];
      });

      // 3. 각 <h*>에 id로 현재 컨텐츠 내용 추가
      node.id = index;

      // 5. 화면에 보이면 강조되도록 "IntersectionObserver" 등록
      IO = new IntersectionObserver(
        ([
          {
            isIntersecting,
            target: { textContent },
          },
        ]) => {
          if (!isIntersecting) return;
          setCurrentIndex(textContent!);
        },
        { threshold: 0.5 }
      );
      IO.observe(node);

      // 이벤트 해제를 위해 등록
      IOList.push(IO);
    });

    // 이벤트 해제
    return () => IOList.forEach((IO) => IO.disconnect());
  }, []);

  return (
    <TocView
      indexList={indexList}
      currentIndex={currentIndex}
      handleIsTocClick={handleIsTocClick}
    />
  );
};

export default Toc;
