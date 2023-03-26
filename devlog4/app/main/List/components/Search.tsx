"use client";

import React from "react";
import { searchDropDownList } from "../constants";
import Animation from "./Animation";
import DropDown from "./DropDown";

const Search = () => {
  return (
    <div>
      <Animation />
      <div className="flex">
        <div>
          <DropDown dropDownList={searchDropDownList} />
        </div>
        <div>검색</div>
      </div>
    </div>
  );
};

export default Search;
