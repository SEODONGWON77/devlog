import React from "react";

interface TocViewProps {
  indexList: {
    index: string;
    size: number;
  }[];
  currentIndex: string;
}

const TocView = ({ indexList, currentIndex }: TocViewProps) => {
  return (
    <aside className="fixed right-0 border mr-5 p-5 bg-white z-10 top-[45%] w-[250px] h-auto">
      <ul>
        {indexList.map(({ index, size }) => (
          <li
            key={index}
            style={{
              paddingLeft: size + "px",
              fontSize: 17 - size / 12 + "px",
            }}
            className={`
                  transition-all hover:text-blue-600,
                  ${currentIndex === index ? "text-indigo-400 scale-105" : ""}
                `}
          >
            <a href={`#${index}`}>{index}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TocView;
