import React from "react";
import "@fontsource/bebas-neue";

const ImageTopBanner = ({ imgSource, banner_title }) => {
  return (
    <div className="flex w-full items-center justify-start h-[12%] relative">
      {/* Image with styles to fill the width */}
      <img
        src={imgSource}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Banner Image"
      />
      {/* Overlaying text */}
      <h1 className="relative z-10 text-neutral-100 text-center text-[5rem] font-bebas-neue flex w-full pl-[25rem]">
        {banner_title}
      </h1>
    </div>
  );
};

export default ImageTopBanner;
