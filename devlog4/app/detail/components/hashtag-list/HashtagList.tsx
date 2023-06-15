import React, { useEffect, useRef } from "react";
import HashtagListView from "./HashtagListView";

interface HashtagListViewProps {
  index?: string;
  item?: string;
}

const HashtagList: React.FC<HashtagListViewProps> = ({ index, item }) => {

  const props = {
    index,
    item,
  };

  return <HashtagListView {...props} />;
};

export default HashtagList;
