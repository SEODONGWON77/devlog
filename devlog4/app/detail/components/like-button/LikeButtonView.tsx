import React from "react";

interface LikeButtonViewProps {

}

const LikeButtonView = React.forwardRef<
  HTMLInputElement,
  LikeButtonViewProps
>(() => {
  return (
    <div>
      좋아요
    </div>
  );
});
LikeButtonView.displayName = "LikeButtonView";
export default LikeButtonView;
