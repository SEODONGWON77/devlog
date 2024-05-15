import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

interface ThumbnailDropzoneProps {
  handleThumbnailImageUrl: (file: File) => void;
}

const ThumbnailDropzone = ({
  handleThumbnailImageUrl,
}: ThumbnailDropzoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // handleThumbnailImageUrl(String(reader.result));
      handleThumbnailImageUrl(file);
    };
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const imgRef = useRef(null);
  return (
    <div
      className="w-[254px] h-[169px]  border border-solid border-lightGray-20"
      {...getRootProps()}
    >
      <input type="file" {...getInputProps()} ref={imgRef} />
      {isDragActive ? (
        <div>이미지를 놓아 주세요...</div>
      ) : (
        <div className="text-center mt-4 cursor-pointer">
          <img src="/picture.png" alt="" className="w-[40%] m-auto" />
          <span>썸네일 등록</span>
        </div>
      )}
    </div>
  );
};

export default ThumbnailDropzone;
