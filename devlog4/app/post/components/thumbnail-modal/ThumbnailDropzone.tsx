import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ThumbnailDropzone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="w-[254px] h-[169px]  border border-solid border-lightGray-20"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
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
