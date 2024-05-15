import React from "react";

interface HashtagListViewProps {
  text?: string;
  order?: any;
}

const HashtagListView = React.forwardRef<
  HTMLInputElement,
  HashtagListViewProps
>(({text, order}, ref): any => {
  // return (
  //   <div key={order} className={buttonStyle}>#{text}</div>
  // );

  return (
    <button
      type="button"
      className={buttonStyle2}
      data-te-ripple-init
      key={order}
    >
    #{text}
    </button>
  );
});
HashtagListView.displayName = "HashtagListView";
export default HashtagListView;

const {
  buttonWrap,
  buttonStyle,
  buttonStyle2
} = {
  buttonWrap: 'inline-flex justify-between', 
  buttonStyle: 'px-3 py-1 text-sm font-semibold text-gray-700',
  buttonStyle2: 'inline-block rounded-full border-2 border-primary m-1 px-5 pb-[6px] pt-1 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10',
};
