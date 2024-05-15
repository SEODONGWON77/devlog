import React from "react";
import Image from "next/image";
import { BASE_URL } from "../constant";

interface GalleryProps {
  url: string;
  alt: string;
}

const Gallery = ({ url, alt }: GalleryProps) => {
  return (
    <div className="w-full h-[169px]">
      <img src={url} alt={alt} className="w-[100%] h-[100%] object-cover" />
    </div>
  );
};

export default Gallery;
