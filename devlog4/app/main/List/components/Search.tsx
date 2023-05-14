"use client";

import axios from "axios";
import React from "react";
import { searchDropDownList } from "../constants";
import Animation from "./Animation";
import DropDown from "./DropDown";
const Search = () => {
  const submitHandler = async () => {
    try {
      await axios.post("/_search/");
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
