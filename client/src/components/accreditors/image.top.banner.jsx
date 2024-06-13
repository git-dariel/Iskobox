import React from "react";

const ImageTopBanner = ({ imgSource }) => {
  return (
    <div className="flex w-full bg-red-950">
      <img src={imgSource} className="flex" />
    </div>
  );
};

export default ImageTopBanner;
