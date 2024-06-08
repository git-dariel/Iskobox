import React from "react";

const ImageTopBanner = ({ imgSource }) => {
  return (
    <div className="flex w-full bg-green-950">
      <img src={imgSource} />
    </div>
  );
};

export default ImageTopBanner;
