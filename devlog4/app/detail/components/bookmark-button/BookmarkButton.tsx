import React, { useEffect, useRef } from "react";
import BookmarkButtonView from "./BookmarkButtonView";

interface BookmarkButtonProps {
  count?: any;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ count }) => {

  const props = {
    count,
  };

  return <BookmarkButtonView {...props} />;
};

export default BookmarkButton;
