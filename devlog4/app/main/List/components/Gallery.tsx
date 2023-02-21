import React from "react";
import Image from 'next/image';
import { BASE_URL } from "../constants";

const Gallery = (props: any) => {
  const {url, alt} = props;
  const src = url.replace(BASE_URL('/img'), '');

  const loaderTest = () => {
    return BASE_URL(`/img${src}`);
  }
  return (
    <div>
      <Image
        loader={loaderTest}
        src={src}
        alt={alt}
        className={imgStyle}
        width={60}
        height={88}
      />
    </div>
  );
};

export default Gallery;

const imgStyle = `flex-none rounded-md bg-slate-100 hover:object-fill`;