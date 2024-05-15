import React, { useEffect, useRef } from "react";
import LikeButtonView from "./LikeButtonView";

interface LikeButtonProps {
  _id?: any;
  count?: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ count, _id }) => {

  const props = {
    count,
    _id,
  };

  return <LikeButtonView {...props} />;
};

export default LikeButton;
