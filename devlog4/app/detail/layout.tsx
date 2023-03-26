import React from "react";
import Detail from "./components/Detail";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-full">
        <div className="w-full flex">
          <div className="w-[10%] bg-lime-100">
            <div>좋아요</div>
          </div>
          <div className="w-[80%]"> 
            <div className="w-full h-20 bg-gray-400">
              <h1 className="text-5xl font-bold">React-Hook</h1>
            </div>
            <div className="w-full flex space-x-4">
              <p className="font-bold">anonymous</p>
              <p className="">2023년 03월 26일</p>
            </div>
            <div className="w-full px-6 pt-4 pb-2">
              <span className={buttonStyle}>#카테고리1</span>
              <span className={buttonStyle}>#카테고리2</span>
              <span className={buttonStyle}>#카테고리3</span>
            </div>
            {/* <div className="flex-auto flex space-x-4 w-full px-6 pt-2 pb-2">
              <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white" type="submit">
                Buy now
              </button>
              <button className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900" type="button">
                Add to bag
              </button>
            </div> */}

            <div className="w-full h-80 bg-slate-400">
              <div className="bg-white border-slate-100 border-b rounded-t-xl">


              </div>
            </div>
            <div className="w-full">
              <Detail />
              {children}
            </div>
          </div>
          <div className="w-[10%] bg-lime-100">플롯메뉴 컴포넌트</div>
        </div>
      </div>
  );
}

export default MainLayout;

const {
  buttonStyle
} = {
  buttonStyle: 'cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
};
