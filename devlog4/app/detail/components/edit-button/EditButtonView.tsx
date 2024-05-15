import React, { useState } from "react";
import Link from "next/link";
import DeleteModal from "../delete-modal/DeleteModal";
interface EditButtonViewProps {
  deleteIndex: number;
}

const EditButtonView = React.forwardRef<
  HTMLInputElement,
  EditButtonViewProps
>(({deleteIndex}, ref): any => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onClickDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const onClickEvent = () => {
    if (!isNaN(deleteIndex)) {
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <>
      <Link
        href={{
          pathname: "/post",
          query: { edit: true }
        }}
        className="bg-[#08a4ff] rounded px-4 flex items-center mt-[-2px]"
      >
        <span className="text-sm">수정</span>
      </Link>
      <button
        className="bg-[#08a4ff] rounded px-4 flex items-center mt-[-2px]"
        onClick={onClickEvent}
      >
        <span className="text-sm">삭제</span>
      </button>
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        handleCloseModal={handleCloseModal}
        deleteIndex={deleteIndex}
      />
    </>
  );
});
EditButtonView.displayName = "EditButtonView";
export default EditButtonView;
