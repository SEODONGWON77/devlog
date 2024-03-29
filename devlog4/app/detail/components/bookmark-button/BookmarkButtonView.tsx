import React from "react";

interface BookmarkButtonProps {
  count?: number;
}

const BookmarkButtonView = React.forwardRef<
  HTMLInputElement,
  BookmarkButtonProps
>(({ count }, ref) => {
  return (
    <div>
      <div className="pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900">
        <div className="flex px-3 py-2">
          <svg className="mr-2.5 h-5 w-5 flex-none fill-slate-400">
            <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"></path>
          </svg>
          Bookmark
        </div>
        <div className="border-l border-slate-400/20 px-2.5 py-2">{count}</div>
      </div>
    </div>
  );
});
BookmarkButtonView.displayName = "BookmarkButtonView";
export default BookmarkButtonView;
