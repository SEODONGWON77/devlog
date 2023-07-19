import React, { useEffect, useRef } from "react";
import LikeButtonView from "./LikeButtonView";

interface LikeButtonProps {
  count?: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ count }) => {


  const props = {
    count,
  };

  return <LikeButtonView {...props} />;
};

export default LikeButton;
