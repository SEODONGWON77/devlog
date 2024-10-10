
import React, { useLayoutEffect, useEffect, useState, useRef, useCallback } from "react";
import InfiniteScrollView from "./InfiniteScrollView";

interface InfiniteScrollProps {
  View?: any;
  count?: number;
  propName: string;
  fetcher?: any;
  children?: any;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ View, count, propName, fetcher, children }) => {

  const props = {
    View,
    count,
    fetcher,
    propName,
  };

  return <InfiniteScrollView {...props}>{children}</InfiniteScrollView>;
};

export default InfiniteScroll;
