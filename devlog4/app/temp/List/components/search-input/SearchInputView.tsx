import React from "react";

interface SearchInputViewProps {
  searchWord?: string;
  changeSearchWord?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const SearchInputView = React.forwardRef<
  HTMLInputElement,
  SearchInputViewProps
>(({ searchWord, changeSearchWord, onKeyUp, placeholder }, ref) => {
  return (
    <input
      id="number-search-input"
      className="block w-full min-w-[500px] font-medium border-none outline-none h-full focus:border-0 text-md leading-[56px] "
      ref={ref}
      type="text"
      value={searchWord}
      onChange={changeSearchWord}
      onKeyUp={onKeyUp}
      autoComplete="off"
      placeholder={placeholder}
    />
  );
});
SearchInputView.displayName = "SearchInputView";
export default SearchInputView;
