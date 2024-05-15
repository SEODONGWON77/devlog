import React, { useEffect, useRef } from "react";
import EditButtonView from "./EditButtonView";

interface EditButtonProps {
  deleteIndex: number;
}

const EditButton: React.FC<EditButtonProps> = ({ deleteIndex }) => {

  const props = {
    deleteIndex,
  };

  return <EditButtonView {...props} />;
};

export default EditButton;
