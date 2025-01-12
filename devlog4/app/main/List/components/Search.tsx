"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { debounce } from "utils/debounce/debounce";
import { getPostCardList, searchPosts } from "app/lib/action";
import { useSetRecoilState } from "recoil";
import { searchListState } from "../../../recoil/state";
import { PostCard } from "app/service/detail/utils/schema";

const Search = () => {

  const setSearchListState = useSetRecoilState(searchListState);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (searchRef.current) {
      const currentValue = searchRef.current.value;
      debounceFilter(currentValue);
    }
  };

  const debounceFilter = debounce(async (value: string) => {
    if (value === "") {
      const allPosts = await getPostCardList({ from: 1, to: 8 });
      setSearchListState(allPosts.response as PostCard[]);
    } else {
      const res = await searchPosts(value);
      setSearchListState(res as PostCard[]);
    }
  }, 1000);

  return (
    <div className="flex align-middle justify-center mt-8">
      <div className="w-[50%] h-[3rem] p-[2px] flex border border-solid border-lightGray-20 rounded-md">
        <div className="w-[30px] mt-3 ml-3">
          <Image src={"/search.png"} width={20} height={20} alt="" />
        </div>
        <input
          className="block w-full min-w-[500px] font-medium border-none outline-none h-full focus:border-0 text-md leading-[56px] "
          ref={searchRef}
          type="text"
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
    </div>
  );
};

export default Search;
