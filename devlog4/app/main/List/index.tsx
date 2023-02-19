"use client"

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import List from "./components/List";

const Index = ({data}: any) => {

  const [posts, setPosts] = useState(data[0]);
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const newPosts = await res.json();
    setPosts((post: any) => [...post, ...newPosts]);
  };

  return (
    <>
      {
        posts && 
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePost}
          hasMore={hasMore}
          loader={<h3> Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          <List posts={posts}/>
        </InfiniteScroll>
      }
    </>
  );
};

export default Index;