import React, { useState } from "react";
import img3 from "../../../assets/homeAssets/img3.jpg";
import img4 from "../../../assets/homeAssets/img4.jpg";
import img5 from "../../../assets/homeAssets/img5.png";
import img6 from "../../../assets/homeAssets/img6.jpg";
import img7 from "../../../assets/homeAssets/img7.jpg";
import img8 from "../../../assets/homeAssets/img8.png";
import { BiSolidLeftArrow, BiCaretRight  } from "react-icons/bi";



export default function CarouselHome() {
  const [current, setCurrent] = useState(0);
  const data = [
    {
      id: 1,
      image: img3,
      title: "BACHELOR OF PUBLIC ADMINISTRATION",
      detail:
        "This program generally introduces the learner to the major concepts including politics, governance, autonomy, and power in the concepts are further crystallized in the learning process as it is seen by the learning...",
      goto: "link here",
    },
    {
      id: 2,
      image: img4,
      title:
        "BACHELOR OF SCIENCE IN AGRIBUSINESS MANAGEMENT AND ENTREPRENEURSHIP",
      detail:
        "The Bachelor of Science in Agribusiness Management and Entrepreneurship is a 4-year degree program with a curriculum that is designed to a more relevant to domestic and global conditions and responsive to the fast-changing need of time. It is designed to complement...",
      goto: "link here",
    },
    {
      id: 3,
      image: img5,
      title: "BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION",
      detail:
        "The Marketing Management program prepares the graduate for careers in marketing, market research, advertising, and public relations. The curriculum provides the graduate with both technical skills and competencies...",
      goto: "link here",
    },
    {
      id: 4,
      image: img6,
      title: "BACHELOR OF SCIENCE IN OFFICE ADMINISTRATION",
      detail:
        "The BSOA is a four-year degree program that prepares the students for a career in an outcome-focused, technology-rich professional environment. The curriculum is designed to equip its graduates the professional skills...",
      goto: "link here",
    },
    {
      id: 5,
      image: img7,
      title: "BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT",
      detail:
        "The Bachelor of Science in Hospitality Management is a ladderized program that prepares students to have employable skills/competencies at every academic year level for them to be competitive in the hospitality industry locally and globally. This also prepares...",
      goto: "link here",
    },
  ];

  const nextSlide = () => {
    setCurrent((current + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + data.length) % data.length);
  };

  return (
    <div className="h-[110vh] bg-[#810101] flex flex-col  items-center lg:h-[100vh]">
      <div
        className="w-full text-center  select-none bg-cover bg-no-repeat bg-center shadow-xl"
        style={{ backgroundImage: `url(${img8})` }}
      >
        <div className="bg-[#810101] bg-opacity-50  px-10">
          <h1 className="text-[#dca819] text-xl font-extrabold sm:text-xl md:text-3xl lg:text-4xl px-10 py-10 flex flex-col ">
            Program Under Evaluation
          </h1>
        </div>
      </div>

      <div className=" px-10  gap-10 w-full h-full flex items-center">
        {/* preview button */}
        <button onClick={prevSlide} className="p-4 bg-gray-300 bg-transparent hover:bg-[#EAD4CB] hover:bg-opacity-50">
        <BiSolidLeftArrow className="text-xl"/>
        </button>

        {/* carousel container */}
        <div className="relative overflow-hidden">
          {/* form container*/}
          <div
            className="flex transition-transform duration-500  "
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
                <div className=" w-full  flex justify-center items-center  md:justify-center  lg:justify-center md:items-center lg:items-center">
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className=" w-[420px] h-[230px] md:w-[560px] md:h-[330px]  "
                  />
                </div>
                {/* discription */}

                <div className="text-justify text-[#ffffff] flex flex-col lg:justify-around md:justify-around   justify-around  w-full ">
                  {/* <title> */}
                  <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
                    {slide.title}
                  </h1>
                  <br />
                  {/* details */}
                  <p className="text-sm md:text-lg lg:text-xl">
                    {slide.detail}
                  </p>
                  <br />
                  <a> {/* slide.goto here*/} Read More</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextSlide} className="p-3 bg-transparent hover:bg-[#EAD4CB] hover:bg-opacity-50">
          <BiCaretRight className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
