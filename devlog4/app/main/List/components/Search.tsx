"use client";

import axios from "axios";
import React, { useState } from "react";
import { searchDropDownList } from "../constants";
import Animation from "./Animation";
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
    <div>
      <div className="flex">
        <div>
          <DropDown {...props} />
        </div>
      </div>
    </div>
  );
};

export default Search;
