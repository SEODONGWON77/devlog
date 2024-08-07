import React, { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { postState } from "../../../recoil/state";
import BaseModal from "app/components/base-modal";
import Gallery from "../../../main/List/components/Gallery";
import ThumbnailDropzone from "./ThumbnailDropzone";
import dayjs from "dayjs";
import { uploadFile } from "app/components/utils";

interface ThumbnailModalProps {
  isThumbNailModalOpen: boolean;
  title: string;
  userName: string;
  handleCloseModal: () => void;
  handleSubmit: (previewImageUri: string, shortIntrodution: string, editSubmit?: boolean, editImage?: boolean) => void;
  editMode: boolean;
}
const image: string = `https://media.istockphoto.com/id/1322277517/ko/%EC%82%AC%EC%A7%84/%EC%9D%BC%EB%AA%B0%EC%97%90-%EC%82%B0%EC%97%90%EC%84%9C-%EC%95%BC%EC%83%9D-%EC%9E%94%EB%94%94.jpg?s=1024x1024&w=is&k=20&c=aI6xe1rXGKkbA-BdjMwqg5NVXEoOkhIPQe6sy5zTMsA=`;

const index = 1;

const ThumbnailModal = ({
  isThumbNailModalOpen,
  title,
  userName,
  handleCloseModal,
  handleSubmit,
  editMode,
}: ThumbnailModalProps) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [shortIntrodution, setShortIntrodution] = useState<string>("짧은 소개글");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const postData: any = useRecoilValue(postState);

  useEffect(() => {
    if (editMode) {
      handleEditableInfo();
    }
  }, []);

  const handleEditableInfo = () => {
    console.log("modal///", postData);

    setShortIntrodution(postData.shortcontent);
    setPreviewImageUrl(postData.previewimageurl);
    //handleThumbnailImageUrl(((imageUrl) => new File([imageUrl], imageUrl.split('upload/').slice(-1)))(postData.previewimageurl));
  }

  const handleThumbnailImageUrl = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImageUrl(String(reader.result));
      setPreviewImage(file);
    };
  };

  const onClickSubmit = async () => {
    if (!previewImage && previewImageUrl && editMode) {
      return handleSubmit(previewImageUrl, shortIntrodution, editMode);
    }

    if (previewImage === null) return alert("썸네일 이미지를 등록해주세요.");
      const fileExt = previewImage.name.split(".").pop();
      if (
        previewImage.type === "image/jpeg" ||
        fileExt === "jpg" ||
        previewImage.type === "image/png" ||
        fileExt === "png"
      ) {
        const fileId = dayjs().format("YYYYMMDDHHmmssSSS");
        const fileName = `${fileId}_${previewImage.name}`;
        const res = await uploadFile(previewImage, fileName);
        return handleSubmit(res.Location, shortIntrodution, editMode, true);
      } else {
        alert("jpg, png 파일만 Upload 가능합니다.");
        return;
      }
  };

  const onChangeShortIntro = (value: string) => {
    setShortIntrodution(value);
  };

  const onClickloseModal = () => {
    if (!editMode) {
      setPreviewImage(null);
      setPreviewImageUrl(null);
    }
    handleCloseModal();  
  };

  return (
    <BaseModal isOpen={isThumbNailModalOpen} closeModal={onClickloseModal}>
      <div className="flex flex-col w-[680px] h-[500px] bg-white text-lg text-darkBlue mt-[26px] mb-[20px]">
        <div className="flex gap-2">
          <div className="w-[50%] m-5">
            <ThumbnailDropzone
              handleThumbnailImageUrl={handleThumbnailImageUrl}
            />
            <textarea
              className="w-full h-[100px]  border border-solid border-lightGray-20 resize-none"
              placeholder="게시글 소개를 짧게 작성해주세요."
              value={shortIntrodution}
              onChange={(e) => onChangeShortIntro(e.target.value)}
            />
            <div>공개여부 전체, 회원, 친구, 혼자</div>
          </div>
          <div className="w-[50%]">
            썸네일 프리뷰
            <div className="cursor-pointer m-7 w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[88px]">
              <Gallery
                url={previewImageUrl !== null ? previewImageUrl : image}
                alt={`product-${index}`}
              />
              <div className="p-5">
                <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {shortIntrodution}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{}</p>
              </div>
            </div>
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
            onClick={()=>onClickSubmit(false)}
            className="mr-[10px] mt-[10px] font-bold leading-9  rounded h-9 w-14  text-md"
          >
            완료
          </button>
          <button
            onClick={()=>onClickSubmit(true)}
            className="mr-[10px] mt-[10px] font-bold leading-9  rounded h-9 w-14  text-md"
          >
            임시 저장
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ThumbnailModal;
