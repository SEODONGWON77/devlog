"use client";
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../../public/animation2.json";

const Animation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 300, height: 300 }}
    />
  );
}

export default Animation;