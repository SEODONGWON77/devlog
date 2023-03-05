import React from "react";
import Image from 'next/image';
import { BASE_URL } from "../constants";

const Gallery = (props: any) => {
  const {url, alt} = props;
  const src = url;
  const loaderTest = () => url;

  return (
    <div>
      <Image
        loader={loaderTest}
        src={src}
        alt={alt}
        width={500}
        height={88}
      />
    </div>
  );
};

export default Gallery;