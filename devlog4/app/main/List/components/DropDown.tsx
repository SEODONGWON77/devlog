"use client";
import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import SearchInput from "./search-input";
import Image from "next/image";

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
    <div className="w-full h-[3rem] p-[2px] flex border border-solid border-lightGray-20 rounded-md">
      <div className="w-[30px] mt-3 ml-3">
        <Image src={"/search.png"} width={20} height={20} alt="" />
      </div>
      <SearchInput
        searchWord={searchWord}
        changeSearchWord={changeSearchWord}
        onKeyUp={searchBarKeyUp}
        placeholder={`검색어를 입력해주세요.`}
      />
    </div>
  );
};

export default DropDown;
