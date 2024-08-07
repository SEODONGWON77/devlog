import React, { useEffect, useRef } from "react";
import SearchInputView from "./SearchInputView";

interface SearchInputProps {
  searchWord?: string;
  changeSearchWord?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchWord, changeSearchWord, onKeyUp, placeholder }) => {
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

  return <SearchInputView {...props} />;
};

export default SearchInput;
