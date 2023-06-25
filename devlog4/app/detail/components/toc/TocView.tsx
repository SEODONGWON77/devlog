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
    <aside className="fixed right-10 border-l-4 border-indigo-400 px-4 py-2 bg-white z-10">
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
