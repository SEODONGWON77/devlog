import React from "react";

const Gallery = (props: any) => {
  return (
    <div className="">
      <img
        {...props}
        className={imgStyle}
        width="60" height="88"
      />
    </div>
  );
};

export default Gallery;

const imgStyle = `flex-none rounded-md bg-slate-100 hover:object-fill`;