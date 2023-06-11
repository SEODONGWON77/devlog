import React from "react";
import BaseModal from "app/components/base-modal";
import Gallery from "../../../main/List/components/Gallery";
import ThumbnailDropzone from "./ThumbnailDropzone";

interface ThumbnailModalProps {
  isNameChangeOpen: boolean;
  closeModal: () => void;
  handleTitleChange: (e: string) => void;
  handleSubmit: () => void;
  handleShortContent: (value: string) => void;
}

const image: string = `https://media.istockphoto.com/id/1322277517/ko/%EC%82%AC%EC%A7%84/%EC%9D%BC%EB%AA%B0%EC%97%90-%EC%82%B0%EC%97%90%EC%84%9C-%EC%95%BC%EC%83%9D-%EC%9E%94%EB%94%94.jpg?s=1024x1024&w=is&k=20&c=aI6xe1rXGKkbA-BdjMwqg5NVXEoOkhIPQe6sy5zTMsA=`;

const index = 1;

const ThumbnailModal = ({
  isNameChangeOpen,
  closeModal,
  handleTitleChange,
  handleSubmit,
  handleShortContent,
}: ThumbnailModalProps) => {

  const handleThubnailImage = () => {
    
  } 

  return (
    <BaseModal isOpen={isNameChangeOpen} closeModal={closeModal}>
      <div className="flex flex-col w-[680px] h-[500px] bg-white text-lg text-darkBlue mt-[26px] mb-[20px]">
        <div className="flex gap-2">
          <div className="w-[50%] m-5">
            <ThumbnailDropzone />
            <textarea
              className="w-full h-[100px]  border border-solid border-lightGray-20 resize-none"
              placeholder="게시글 소개를 짧게 작성해주세요."
              onChange={(e) => handleShortContent(e.target.value)}
            />
            <div>공개여부 전체, 회원, 친구, 혼자</div>
          </div>
          <div className="w-[50%]">
            썸네일 프리뷰
            <div className="cursor-pointer m-7 w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Gallery url={image} alt={`product-${index}`} />
              <div className="p-5">
                <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  미리보기 제목
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  미리보기 짧은 소개글
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  미리보기 작성자
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  미리보기 날짜
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center gap-1 h-[56px] mt-[10px] mb-[6px]">
          <button
            className=" mt-[10px]  font-bold leading-9 rounded h-9 w-14  text-darkGray-10 hover:text-main text-md"
            onClick={closeModal}
          >
            취소
          </button>

          <button
            onClick={() => handleSubmit()}
            className="mr-[10px] mt-[10px] font-bold leading-9  rounded h-9 w-14  text-md"
          >
            완료
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ThumbnailModal;
