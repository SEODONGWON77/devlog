import React from "react";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";

interface LikeButtonViewProps {
  count?: number;
  _id?: any;
}

const LikeButtonView = React.forwardRef<
  HTMLInputElement,
  LikeButtonViewProps
>(({count = 0, _id}, ref): any => {
  
  const onClickLikeAdded = async () => {
    const likedCounter = count + 1;
    const allFetch = createAllRestFetchByDevlog("post");
    const result = await allFetch.postFetch(`_id:${_id}&likedCounter:${count}`, {
      likedCounter,
    });
    return result;
  };

  return (
    <button
      type="button"
      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm leading-4 p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      onClick={onClickLikeAdded}>
      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
      </svg>
      <span className="pl-1">{count}</span>
    </button>
  );
});
LikeButtonView.displayName = "LikeButtonView";
export default LikeButtonView;
