import React from "react";
import img1 from "../../../assets/homeAssets/img1.png";
import img2 from "../../../assets/homeAssets/img2.png";
import img3 from "../../../assets/homeAssets/img3.jpg";
import img4 from "../../../assets/homeAssets/img4.jpg";
import img5 from "../../../assets/homeAssets/img5.png";
import img6 from "../../../assets/homeAssets/img6.jpg";
import img7 from "../../../assets/homeAssets/img7.jpg";
import img8 from "../../../assets/homeAssets/img8.png";

export default function HomeContent() {
  return (
    <>
      <div className="bg-[#810101] select-none  ">
        <div className="flex flex-col px-4 py-20 lg:flex lg:items-center md:items-center sm:items-center 
        ">
          {/* welocme image */}
          <div className=" border-2 w-full">
            <img src={img1} alt="My Image Description " />
          </div>

          {/* 10 pillar of pup */}
          <div className="gap-10 border-2 w-full flex flex-col items-center">
            <div className="flex items-center ">
              <h1 className="text-[#ffffff] text-3xl font-extrabold  sm:text-5xl">
                The PUP Lopez, Quezon Branch
              </h1>
            </div>
            <div>
              <video width="1010" height="480" controls>
                <source
                  src="https://www.youtube.com/watch?v=i7qQVvI8fOI"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${img8})` }}>
            <h1
              className="text-[#ffffff] text-3xl font-extrabold  sm:text-5xl px-10 py-10"
              
            >
              PUP Vision, Mission and 10 Pillars Reform Agenda
            </h1>
          </div>
          <div className="gap-10 border-2 w-full flex flex-col items-center">
            <div>
              <video width="1010" height="480" controls>
                <source
                  src="https://www.youtube.com/watch?v=i7qQVvI8fOI"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* message from director */}
          <div className="gap-10 border-2 w-full flex flex-col items-center">
            <div className="flex items-center ">
              <h1 className="text-[#ffffff] text-3xl font-extrabold  sm:text-5xl">
                MESSAGE FROM THE DIRECTOR
              </h1>
            </div>
            <div className="flex gap-10 px-10 py-10">
              {/* Director Img */}
              <div className="">
                <img src={img2} />
              </div>
              {/* Director Message */}
              <div className="flex flex-col gap-2 text-justify ">
                {/* 1st Paragraph */}
                <p>
                  PUP Lopez was founded in the Fourth Congressional District of
                  Quezon in 1979. Since then, it has always been aimed to become
                  the leading Tertiary Institution in the community.
                  Subsequently, in 2011, it started to embrace its goal to
                  transform PUP Lopez into a Premiere University through
                  productive institutional innovations and good governance. It
                  anchored its bow and arrow on exploratory to experimental yet
                  gainful activities. It also opened its doors to outside
                  stakeholders who can help the University, and offered
                  additional relevant academic programs with the objective of
                  helping the youths achieve their dreams. At present, the Lopez
                  Campus continues to play a role in improving the lives of the
                  youth and their families and help in nation building.
                </p>
                {/* 2nd paragraph */}
                <p>
                  Being the first and the largest branch of PUP in Southern
                  Luzon, with its high-caliber faculty and dedicated staff,
                  Lopez Branch is committed to support the Administration in the
                  attainment of its vision, mission and objectives and be of
                  service to its clienteles, the Iskolar ng Bayan and the
                  general public. Today, it focuses on sustaining its high
                  performance in licensure exams, particularly in the field of
                  Engineering where it has already produced Topnotchers and
                  continuing to improve its infrastructures and facilities in
                  the campus such as highly-equipped laboratories, compliant
                  buildings, and other amenities suited to the needs of every
                  student, giving care and concern to its faculty and staff, and
                  even in responding to the societys' needs through innovative
                  researches, extension and outreach projects.
                </p>
                <p className="flex flex-col text-end">
                  <span>Rufo N. Bueza,</span>
                  <span> DPA Director</span>
                </p>
              </div>
            </div>
          </div>

          {/* Programs Under Evaluation */}
          <div className=" border-2 w-full flex flex-col items-center">
            <div className="flex items-center ">
              <h1 className="text-[#ffffff] text-3xl font-extrabold  sm:text-5xl">
                Programs Under Evaluation
              </h1>
            </div>

            {/* BPA */}
            <div className="flex flex-row items-center border-2">
              <div className="px-10 p-10 w-[50%]">
                <img src={img3} className=" object-cover" />
              </div>
              <div className="flex flex-col items-center text-justify gap-10 px-10 p-10 w-[50%]">
                <h3>BACHELOR OF PUBLIC ADMINISTRATION</h3>
                <p>
                  This program generally introduces the learner to the major
                  concepts including politics, governance, autonomy, and power
                  in the concepts are further crystallized in the learning
                  process as it is seen by the learning...
                </p>
                <a>Read More</a>
              </div>
            </div>

            {/* BSAME */}
            <div className="flex flex-row items-center border-2">
              <div className="px-10 p-10  w-[50%]">
                <img src={img4} className=" object-cover" />
              </div>
              <div className="flex flex-col items-center text-justify gap-10 px-10 p-10  w-[50%]">
                <h3>
                  BACHELOR OF SCIENCE IN AGRIBUSINESS MANAGEMENT AND
                  ENTREPRENEURSHIP
                </h3>
                <p>
                  The Bachelor of Science in Agribusiness Management and
                  Entrepreneurship is a 4-year degree program with a curriculum
                  that is designed to a more relevant to domestic and global
                  conditions and responsive to the fast-changing need of time.
                  It is designed to complement...
                </p>
                <a>Read More</a>
              </div>
            </div>

            {/* BSBA */}
            <div className="flex flex-row items-center border-2">
              <div className="px-10 p-10 w-[50%] ">
                <img src={img5} className=" object-cover" />
              </div>
              <div className="flex flex-col items-center text-justify gap-10 px-10 p-10  w-[50%]">
                <h3>BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION</h3>
                <p>
                  The Marketing Management program prepares the graduate for
                  careers in marketing, market research, advertising, and public
                  relations. The curriculum provides the graduate with both
                  technical skills and competencies...
                </p>
                <a>Read More</a>
              </div>
            </div>

            {/* BSOA */}
            <div className="flex flex-row items-center border-2">
              <div className="px-10 p-10 w-[50%]">
                <img src={img6} className="  object-cover" />
              </div>
              <div className="flex flex-col items-center text-justify gap-10 px-10 p-10  w-[50%]">
                <h3>BACHELOR OF SCIENCE IN OFFICE ADMINISTRATION</h3>
                <p>
                  The BSOA is a four-year degree program that prepares the
                  students for a career in an outcome-focused, technology-rich
                  professional environment. The curriculum is designed to equip
                  its graduates the professional skills...
                </p>
                <a>Read More</a>
              </div>
            </div>

            {/* BSHM */}
            <div className="flex flex-row items-center border-2">
              <div className="px-10 p-10 w-[50%]">
                <img src={img7} className="  object-cover " />
              </div>
              <div className="flex flex-col items-center text-justify gap-10 px-10 p-10 w-[50%] ">
                <h3>BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT</h3>
                <p>
                  The Bachelor of Science in Hospitality Management is a
                  ladderized program that prepares students to have employable
                  skills/competencies at every academic year level for them to
                  be competitive in the hospitality industry locally and
                  globally. This also prepares...
                </p>
                <a>Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
