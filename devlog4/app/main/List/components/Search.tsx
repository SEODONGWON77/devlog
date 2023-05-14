"use client";

import React from "react";
import { createGetRestFetchBySearch } from "utils/api/fetch/devlogApiRestFetch";
import { searchDropDownList } from "../constants";
import Animation from "./Animation";
import DropDown from "./DropDown";
const Search = () => {
  const submitHandler = async () => {
    try {
      await createGetRestFetchBySearch("", "get")("");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <Animation />
      <div className="flex">
        <div>
          <DropDown dropDownList={searchDropDownList} />
        </div>
        <div onClick={() => submitHandler()}>검색</div>
      </div>
    </div>
  );
};

export default Search;
