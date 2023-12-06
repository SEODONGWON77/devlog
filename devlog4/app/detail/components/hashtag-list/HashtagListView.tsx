import React from "react";

interface HashtagListViewProps {
  index?: string;
  item?: string;
}

const HashtagListView = React.forwardRef<
  HTMLInputElement,
  HashtagListViewProps
>(({ index, item }, ref) => {
  return (
    <div key={index} className={buttonStyle}>#{item}</div>
  );
});
HashtagListView.displayName = "HashtagListView";
export default HashtagListView;

const {
  buttonWrap,
  buttonStyle
} = {
  buttonWrap: 'inline-flex justify-between', 
  buttonStyle: 'px-3 py-1 text-sm font-semibold text-gray-700'
};
