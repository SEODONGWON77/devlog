import React, { useEffect, useRef } from "react";
import TopButtonView from "./TopButtonView";

interface TopButtonProps {
  count?: any;
}

const TopButton: React.FC<TopButtonProps> = ({ count }) => {


  const props = {
    count,
  };

  return <TopButtonView {...props} />;
};

export default TopButton;
