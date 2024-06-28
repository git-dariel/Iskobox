import React from "react";
import "@fontsource/bebas-neue";
import StarsCanvas from "../layout/starcanvas";

const ImageTopBanner = ({ imgSource, banner_title }) => {
  return (
    <div className="flex w-full items-center justify-start min-h-[5rem] xl:min-h-[17rem] relative">
      {/* Image with styles to fill the width */}
      <img
        src={imgSource}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Banner Image"
      />
      {/* Overlaying text */}
      <h1 className="relative z-10 text-neutral-100 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-bebas-neue flex w-full pl-4 sm:pl-10 md:pl-20 lg:pl-32 xl:pl-[15rem] animate-pulse duration-800">
        {banner_title}
        <StarsCanvas />
      </h1>
    </div>
  );
};

export default ImageTopBanner;
