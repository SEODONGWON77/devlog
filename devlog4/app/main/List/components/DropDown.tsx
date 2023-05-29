"use client";
import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import SearchInput from "./search-input";

interface SearchProps {
  searchString: string;

  searchWord: string;
  changeSearchWord?: React.ChangeEventHandler<HTMLInputElement>;
  searchBarKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  enteringSearchWord: string;
  isSearch: boolean;
}

const DropDown = ({
  searchString,
  searchWord,
  changeSearchWord,
  searchBarKeyUp,
  enteringSearchWord,
  isSearch,
}: SearchProps) => {
  return (
    <form onSubmit={() => undefined}>
      <div className="w-full h-[3.75rem] flex">
        <div className="w-[38.75rem] box-border h-full border border-solid border-lightGray-20 rounded-lg">
          <span data-for="tooltip" data-tip>
            <SearchInput
              searchWord={searchWord}
              changeSearchWord={changeSearchWord}
              onKeyUp={searchBarKeyUp}
              placeholder="검색어를 입력해주세요."
            />
          </span>
        </div>
      </div>
      {isSearch && <div>검색성공 f12 확인</div>}
    </form>
  );
};

export default DropDown;
