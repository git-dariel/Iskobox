import React, { useState } from "react";
import { HomeData, data } from "@/configs/LanfingPageConfigs/homepage.data";
import { BiSolidLeftArrow, BiCaretRight } from "react-icons/bi";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";

export default function CarouselHome() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + data.length) % data.length);
  };

  return (
    <section className="w-full lg:h-[100vh] ">
      <div className="border bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]  w-full  h-full flex flex-col items-center ">
        {/* Title */}
        <div
          className="w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl py-10"
          style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
        >
          <h1 className="text-[#dca819] text-3xl font-extrabold  md:text-3xl lg:text-4xl">
            {HomeData.title4}
          </h1>
        </div>

        <div className="flex items-center justify-center px-5 lg:px-10 gap-5 lg:gap-10 w-full  border lg:h-full ">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className={`p-4 bg-transparent hover:bg-[#EAD4CB] hover:bg-opacity-50 transition hover:animate-bounce rounded-lg ${
              current === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : ""
            }`}
            disabled={current === 0}
          >
            <BiSolidLeftArrow className="text-xl" />
          </button>

          {/* Carousel Container */}
          <div className="relative overflow-hidden w-full h-auto max-w-7xl ">
            {/* Form Container */}
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {/* Data Mapping */}
              {data.map((slide) => (
                <div
                  key={slide.id}
                  className="flex flex-col flex-shrink-0 w-full h-full md:w-full lg:flex-row gap-5 border border-[#810101] rounded-lg mt-10 "
                >
                  {/* Image */}
                  <div className="flex flex-col lg:flex-row h-full px-5 py-5 gap-2 lg:gap-4 w-full ">
                    <div className="w-full h-full flex justify-center items-center border">
                      <img
                        src={slide.image}
                        alt={`Slide ${slide.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-justify text-[#810101] flex flex-col w-full justify-around ">
                      <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                        {slide.title}
                      </h1>
                      <br />
                      <p className="text-sm md:text-lg lg:text-xl">
                        {slide.detail}
                      </p>
                      <br />
                      <button className="border border-[#810101] hover:bg-[#ffffff] rounded">
                        <a href={slide.goto}>{slide.goto}</a>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className={`rounded-lg p-3 bg-transparent hover:bg-[#EAD4CB] hover:bg-opacity-50 transition hover:animate-bounce ${
              current === data.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : ""
            }`}
            disabled={current === data.length - 1}
          >
            <BiCaretRight className="text-3xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
