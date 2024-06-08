import React from "react";
import img1 from "../../../assets/homeAssets/img1.png";
import img2 from "../../../assets/homeAssets/img2.png";
import img8 from "../../../assets/homeAssets/img8.png";

export default function HomeContent() {
  return (
    <>
      <div className="bg-[#810101] select-none h-auto ">
        <div
          className="flex flex-col lg:flex lg:items-center md:items-center sm:items-center
        "
        >
          {/* welcome */}
          <div className="bg-[#A64729] flex items-center h-auto justify-center px-10 py-10 lg:h-[100vh] md:h-[80vh]">
            <div>
              <img src={img1} alt="My Image Description " />
            </div>
          </div>

      
          <div className=" bg-[#A64729] w-full flex flex-col items-center lg:h-[100vh] md:h-[80vh] ">
            <div
              className="w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
              style={{ backgroundImage: `url(${img8})` }}
            >
              <div className="bg-[#810101] bg-opacity-50  px-10">
                <h1 className="text-[#dca819] text-2xl font-extrabold sm:text-2xl md:text-2xl lg:text-4xl px-10 py-10 flex flex-col ">
                  PUP Vision, Mission and 10 Pillars Reform Agenda
                </h1>
              </div>
            </div>
            <div className="px-10 py-10">
              <iframe
                className="rounded-xl shadow border shadow-rose-300 w-[460px] h-[230px] md:w-[560px] md:h-[330px] lg:w-[760px] lg:h-[430px]"
                src="https://www.youtube.com/embed/i7qQVvI8fOI"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>

       
          <div className="bg-[#A64729] w-full flex flex-col items-center lg:h-[100vh] md:h-[80vh] border-b-2">
            <div
              className="w-full text-center  select-none bg-cover bg-no-repeat bg-center shadow-xl"
              style={{ backgroundImage: `url(${img8})` }}
            >
              <div className="bg-[#810101] bg-opacity-50  px-10">
                <h1 className="text-[#dca819] text-2xl font-extrabold sm:text-2xl md:text-32xl lg:text-4xl px-10 py-10 flex flex-col ">
                  The PUP Lopez, Quezon Branch
                </h1>
              </div>
            </div>
            <div className="px-10 py-10">
              <iframe
                className="rounded-xl shadow border shadow-rose-300 w-[460px] h-[230px] md:w-[560px] md:h-[330px] lg:w-[760px] lg:h-[430px]"
                src="https://www.youtube.com/embed/NjZvQ380TUc"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>

          {/* message from director */}
          <div className=" bg-[#810101] w-full flex flex-col items-center lg:h-[100vh] md:h-[200vh] sm:h-[250vh] h-[300vh]">
            <div className="flex items-center ">
              <h1 className="text-[#dca819] text-2xl font-extrabold sm:text-2xl md:text-32xl lg:text-4xl px-10 py-10 ">
                MESSAGE FROM THE DIRECTOR
              </h1>
            </div>

            <div className="flex flex-col items-center px-10 justify-center gap-10 lg:flex-row md:flex-col md:items-center sm:flex-col sm:items-center">
              
              <div className=" ">
                <img src={img2} className="rounded-xl border shadow w-[300px]  md:w-[360px] lg:w-[360px] lg:h-[510px]"/>
              </div>

              <div className="flex flex-col gap-2 text-justify md:text-sm lg:text-md w-[60%] text-[#ffffff]  ">
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
                <p>
                     
                </p>

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
                <br/>
                
                <p className="flex flex-col text-end">
                  <span>Rufo N. Bueza,</span>
                  <span> DPA Director</span>
                </p>
              </div>
            </div>
          </div>

          {/* Programs Under Evaluation */}
        </div>
      </div>
    </>
  );
}
