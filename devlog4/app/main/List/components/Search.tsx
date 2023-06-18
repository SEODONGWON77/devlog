"use client";

import axios from "axios";
import React, { useState } from "react";
import { searchDropDownList } from "../constants";
import DropDown from "./DropDown";
import { useSearch } from "./search-input/hooks/useSearch";
const Search = () => {
  const {
    searchOriginalWord,
    searchWord,
    changeSearchWord,
    searchBarKeyUp,
    enteringSearchWord,
    isSearch,
  } = useSearch();

  const [searchString, setSearchString] = useState<string>("");

  const props = {
    searchString,
    searchWord,
    changeSearchWord,
    searchBarKeyUp,
    enteringSearchWord,
    searchDropDownList,
    isSearch,
  };
  return (
    <div className="flex align-middle justify-center mt-8">
      <div>
        <DropDown {...props} />
      </div>
    </div>
  );
};

export default Search;
