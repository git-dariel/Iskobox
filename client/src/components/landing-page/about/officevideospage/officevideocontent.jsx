import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { videosfile } from "@/configs/LanfingPageConfigs/officevideopage";
import { useState } from "react";
import { BiSolidLeftArrow, BiCaretRight } from "react-icons/bi";

export default function OfficeVideoContent() {
  const [current, setCurrent] = useState(0);

  const nextSlide = (length) => {
    setCurrent((current + 1) % length);
  };

  const prevSlide = (length) => {
    setCurrent((current - 1 + length) % length);
  };

  return (
    <section className="w-full flex flex-col bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]">
      {videosfile.map((item) => (
        <div key={item.id} className="w-full flex flex-col justify-center">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover bg-center shadow-xl"
            style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
          >
            <header className="w-full text-center h-full py-10">
              <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
                {item.title}
              </h2>
            </header>
          </div>

          {item.img && item.img.length > 0 && (
            <div className="flex items-center justify-center  lg:px-10 lg:gap-10 w-full lg:h-full ">
              {/* Carousel Container */}
              <div className="relative overflow-hidden w-full h-auto max-w-auto   ">
              
                {/* Form Container */}
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {/* Data Mapping */}
                  {item.img.map((slide) => (
                    <div
                      key={slide.id}
                      className="flex flex-col w-full flex-shrink-0  items-center h-full  md:w-full  px-4 md:px-10 lg:px-[6rem] py-10 lg:flex-row  "
                    >
                      {/* Image */}
                      <div className="flex flex-col lg:flex-row h-full overflow-clip px-5 py-5 gap-2 lg:gap-4 w-full">
                        <div className="flex justify-center items-center">
                          <img
                            src={slide.admissionimg}
                            alt={`Slide ${slide.id}`}
                            className="object-fill h-[668px] w-[1040px] "
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                  {/* Previous Button */}
                  <button
                  onClick={() => prevSlide(item.img.length)}
                  className={`absolute top-1/2 transform -translate-y-1/2 p-4 mx-[10rem]  bg-black bg-opacity-50   hover:bg-[#EAD4CB] hover:bg-opacity-50 rounded-full border ${
                    current === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={current === 0}
                >
                  <BiSolidLeftArrow className="text-xl" />
                </button>
                {/* Next Button */}
                <button
                  onClick={() => nextSlide(item.img.length)}
                  className={`absolute right-[10rem] top-1/2 transform -translate-y-1/2 rounded-full p-3   bg-black bg-opacity-50   hover:bg-[#EAD4CB] hover:bg-opacity-50 border ${
                    current === item.img.length - 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={current === item.img.length - 1}
                >
                  <BiCaretRight className="text-3xl" />
                </button>
              </div>
            </div>
          )}

          <div className="px-4 md:px-10 lg:px-40 py-10">
            <div
              className="relative border border-black"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                src={item.video}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
