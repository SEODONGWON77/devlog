import React, { useEffect, useRef } from "react";
import HashtagListView from "./HashtagListView";

interface HashtagListViewProps {
  text?: string;
  order?: number;
}

const HashtagList: React.FC<HashtagListViewProps> = ({text, order}) => {

  const props = {
    text,
    order,
  };

  return <HashtagListView {...props} />;
};

export default HashtagList;
