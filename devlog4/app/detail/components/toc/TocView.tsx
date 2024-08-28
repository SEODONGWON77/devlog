import React, { useEffect } from "react";

interface TocViewProps {
  indexList: {
    index: string;
    size: number;
  }[];
  currentIndex: string;
  handleIsTocClick: () => void;
}

const TocView = ({
  indexList,
  currentIndex,
  handleIsTocClick,
}: TocViewProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, index: string) => {
    event.preventDefault();
    const element = document.getElementById(index);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    history.pushState(null, "", `#${index}`);
    handleIsTocClick();
  };

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
              transition-all hover:text-blue-600
              ${currentIndex === index ? "text-indigo-400 scale-105" : ""}
            `}
          >
            <a href={`#${index}`} onClick={(e) => handleClick(e, index)}>
              {index}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TocView;