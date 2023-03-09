"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Quill } from "react-quill";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { createAllRestFetchByDevlog } from "utils/api/fetch/devlogApiRestFetch";
import List from "./components/List";
import { useRecoilValue } from "recoil";
import { userEmailState, userNameState } from "../../recoil/state";
const Index = () => {
  const [postList, setPostList] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const userName = useRecoilValue(userNameState);
  const allFetch = createAllRestFetchByDevlog("post");
  const fetchPost = async () => {
    let res = await allFetch.getFetch("/");
    if (res.result && res.result.length == 0) {
      alert("조회된 결과가 없습니다");
    } else {
      setPostList(res.result);
    }
  };

  useEffect(() => {
    fetchPost();
    // var quill = new Quill('#editor', {
    //   modules: {
    //     toolbar: false    // Snow includes toolbar by default
    //   },
    //   theme: 'snow'
    // });
  }, []);

  const infiniteScrollProps: any = () => {
    const Component = {
      loading: () => <h3> Loading...</h3>,
      endMessage: () => <h4>Nothing more to show</h4>,
    };
    return {
      dataLength: postList.length,
      next: fetchPost,
      hasMore: hasMore,
      loader: Component.loading(),
      endMessage: Component.endMessage(),
    };
  };

  return (
    <>
      {postList && (
        <InfiniteScroll {...infiniteScrollProps()} className="columns-4 m-1">
          <List posts={postList} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default Index;

// const Index = ({data}: any) => {
//   const [posts, setPosts] = useState(data[0]);
//   const [hasMore, setHasMore] = useState(true);
//   const infiniteScrollProps: any = () => {
//     const getMorePost = async () => {
//       const allFetch = createAllRestFetchByDevlog("post");
//       const res = await allFetch.getFetch("/");
//       if (res.result && res.result.length == 0) {
//         alert("조회된 결과가 없습니다");
//       }
//       setPosts((post: any) => [...post, ...res.result]);
//     };
//     const Component = {
//       loading: () => (<h3> Loading...</h3>),
//       endMessage: () => (<h4>Nothing more to show</h4>),
//     }
//     return {
//       dataLength: posts.length,
//       next: getMorePost,
//       hasMore: hasMore,
//       loader: Component.loading(),
//       endMessage: Component.endMessage(),
//     }
//   }
//   return (
//     <>
//       {
//         posts &&
//         <InfiniteScroll
//           {...infiniteScrollProps()}
//           >
//           <ul className="divide-y divide-slate-100">
//             <List posts={posts}/>
//           </ul>
//         </InfiniteScroll>
//       }
//     </>
//   );
// };
// export default Index;
