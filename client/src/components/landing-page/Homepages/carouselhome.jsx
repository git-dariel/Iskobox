import React, { useState } from "react";
import { HomeData, data } from "@/configs/LanfingPageConfigs/homepage.data";
import { BiSolidLeftArrow, BiCaretRight } from "react-icons/bi";

export default function CarouselHome() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + data.length) % data.length);
  };

  return (
    <div className=" bg-gradient-to-r from-[#DCA819] via-[#cebb69] to-[#ffffff] w-full h-[110vh] md:h-[130%] lg:h-[100vh] flex flex-col  items-center  gap-5">
      {/* title */}
      <div
        className=" w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
        style={{ backgroundImage: `url(${HomeData.BgImg})` }}
      >
        <div className="bg-[#810101] bg-opacity-50 px-10">
          <h1 className="text-[#dca819] text-xl font-extrabold sm:text-xl md:text-3xl lg:text-4xl px-10 py-10 flex flex-col ">
            Program Under Evaluation
          </h1>
        </div>
      </div>
    
      <div className=" items-center justify-center px-10  gap-10 w-full h-full flex ">
        {/* preview button */}
        <button
          onClick={prevSlide}
          className={`p-4 bg-transparent hover:bg-[#EAD4CB] hover:bg-opacity-50 ${current === 0 ? 'bg-gray-300 text-gray-500' : ''}`}
          disabled={current === 0}
        >
          <BiSolidLeftArrow className="text-xl" />
        </button>

        {/* carousel container */}
        <div className="relative overflow-hidden  ">
          {/* form container*/}
          <div
            className="flex transition-transform duration-500 "
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {/* data maping */}
            {data.map((slide) => (
              // form
              <div
                key={slide.id}
                className=" gap-5 lg:justify-around h-full flex flex-col flex-shrink-0 w-full md:w-full lg:flex-row lg:w-full "
              >
                {/* image */}
                <div className="flex flex-col lg:flex-row h-full px-5 py-5 gap-2 lg:gap-4">
                  <div className="w-full h-[100%]flex justify-center items-center border ">
                    <img
                      src={slide.image}
                      alt={`Slide ${slide.id}`}
                      className="w-full h-full object-cover "
               
                    />
                  </div>
                  <div className="text-justify text-[#810101] flex flex-col  w-[100%]">
                    <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                      {slide.title}
                    </h1>
                    <br />

                    <p className="text-sm md:text-lg lg:text-xl">
                      {slide.detail}
                    </p>
                    <br />
                    <a> {slide.goto}</a>
                  </div>
                </div>

                {/* <div className=" w-full  flex justify-center items-center  md:justify-center  lg:justify-center md:items-center lg:items-center">
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className=" w-[420px] h-[230px] md:w-[560px] md:h-[330px]  "
                  />
                </div>
               

                <div className="text-justify text-[#ffffff] flex flex-col lg:justify-around md:justify-around   justify-around  w-full ">
             
                  <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                    {slide.title}
                  </h1>
                  <br />
             
                  <p className="text-sm md:text-lg lg:text-xl">
                    {slide.detail}
                  </p>
                  <br />
                  <a> {slide.goto}</a>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          className={`rounded-lg p-3 bg-transparent hover:bg-[#EAD4CB] hover:bg-opacity-50 ${current === data.length - 1 ? 'bg-gray-300 text-gray-500' : ''}`}
          disabled={current === data.length - 1}
        >
          <BiCaretRight className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
