import React, { useEffect, useRef } from "react";
import BookmarkButtonView from "./BookmarkButtonView";

interface BookmarkButtonProps {
  searchWord?: string;
  changeSearchWord?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ searchWord, changeSearchWord, onKeyUp, placeholder }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  const props = {
    searchWord,
    changeSearchWord,
    onKeyUp,
    placeholder,
    ref,
  };

  return <BookmarkButtonView {...props} />;
};

export default BookmarkButton;
