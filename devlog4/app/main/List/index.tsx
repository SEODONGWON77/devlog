"use client"

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import List from "./components/List";

const Index = ({data}: any) => {

  const [posts, setPosts] = useState(data[0]);
  const [hasMore, setHasMore] = useState(true);

  const infiniteScrollProps: any = () => {
    const getMorePost = async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const newPosts = await res.json();
      setPosts((post: any) => [...post, ...newPosts]);
    };

    const Component = {
      loading: () => (<h3> Loading...</h3>),
      endMessage: () => (<h4>Nothing more to show</h4>),
    }

    return {
      dataLength: posts.length,
      next: getMorePost,
      hasMore: hasMore,
      loader: Component.loading(),
      endMessage: Component.endMessage(),
    }
  }

  return (
    <>
      {
        posts && 
        <InfiniteScroll
          {...infiniteScrollProps()}
          >
          <ul className="divide-y divide-slate-100">
            <List posts={posts}/>
          </ul>
        </InfiniteScroll>
      }
    </>
  );
};

export default Index;