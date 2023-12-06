import React from "react";

interface TopButtonViewProps {
  count?: number;
}

const TopButtonView = React.forwardRef<
  HTMLInputElement,
  TopButtonViewProps
>(({count}) => {
  return (
    <div>
      TOP
    </div>
  );
});
TopButtonView.displayName = "TopButtonView";
export default TopButtonView;
