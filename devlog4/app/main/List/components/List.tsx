"use client"

import React, { useState } from "react";
import Profile from "./Profile";

const List = ({posts}: any) => {

  return (
    <>
      {posts.map((data: any) => (
        <div
          key={`${data.id}-dv4-${Math.floor(Math.random() * 1000) + 1}`}
          className="border-4 border-yellow-500 text-2xl text-yellow-400 p-2"
          >
          <div className="back">
            <strong> {data.id}</strong> {data.title}
          </div>
          {data.price}
        </div>
      ))}
    </>
  );
};

export default List;
