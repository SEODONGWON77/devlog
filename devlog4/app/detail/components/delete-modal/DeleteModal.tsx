import React, { useState, useRef, useEffect } from "react";
import  {useRouter} from "next/navigation";

import BaseModal from "app/components/base-modal";
import { deletePostWithIndex } from "app/lib/action";

interface DeleteModalProps {
  isDeleteModalOpen: boolean;
  deleteIndex: number;
  handleCloseModal: () => void;
}

const DeleteModal = ({
  isDeleteModalOpen,
  deleteIndex,
  handleCloseModal,
}: DeleteModalProps) => {
  const router = useRouter();

  const onClickSubmit = async () => {
    deletePostWithIndex(deleteIndex).then(() => {
      console.log('콘솔 goto main');
      router.push(`/main`);
    });
  };

  const onClickloseModal = () => {
    handleCloseModal();  
  };

  return (
    <BaseModal isOpen={isDeleteModalOpen} closeModal={onClickloseModal}>
      <div className="flex flex-col w-[300px] h-[150px] bg-white text-lg text-darkBlue mt-[26px] mb-[20px]">
        <div className="flex gap-2">
          <div className="w-[90%] m-5">
            <div>게시글을 삭제하시겠습니까?</div>
          </div>
        </div>
        <div className="flex w-full justify-center gap-1 h-[56px] mt-[10px] mb-[6px]">
          <button
            className=" mt-[10px]  font-bold leading-9 rounded h-9 w-14  text-darkGray-10 hover:text-main text-md"
            onClick={onClickloseModal}
          >
            취소
          </button>
          <button
            onClick={onClickSubmit}
            className="mr-[10px] mt-[10px] font-bold leading-9  rounded h-9 w-14  text-md"
          >
            삭제
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteModal;
