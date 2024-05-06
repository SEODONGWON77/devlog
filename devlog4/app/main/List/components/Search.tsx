"use client";

import axios from "axios";
import React, { useState } from "react";
import { searchDropDownList } from "../constant";
import DropDown from "./DropDown";
import SearchInput from "./search-input";
import { useSearch } from "./search-input/hooks/useSearch";
import Image from "next/image";

interface SearchProps {
  searchWord: string;
  changeSearchWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchBarKeyUp: (e: React.KeyboardEvent<Element>) => void;
  searchResult: any;
}

const Search = ({
  searchWord,
  changeSearchWord,
  searchBarKeyUp,
  searchResult,
}: SearchProps) => {
  return (
    <div className="flex align-middle justify-center mt-8">
      <div className="w-[50%] h-[3rem] p-[2px] flex border border-solid border-lightGray-20 rounded-md">
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
    </div>
  );
};

export default Search;
