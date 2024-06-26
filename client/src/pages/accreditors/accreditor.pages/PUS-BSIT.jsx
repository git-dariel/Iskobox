import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import MainLayout from "../layout/main.layout";
import common from "@/configs/common.config";
import { Link } from "react-router-dom";

function BSIT() {
  return (
    <MainLayout>
      <section
        className="relative min-h-[40rem] select-none bg-cover bg-no-repeat bg-center shadow-xl flex justify-center items-center"
        style={{ backgroundImage: `url(${common.BSIT.icon})` }}
      >
        <div className="absolute inset-0 bg-teal-950 bg-opacity-50"></div>
        <div className="relative w-full h-full flex items-center">
          <h1 className="flex flex-col items-start px-20 md:px-32 lg:px-40 md:gap-3 xl:gap-6">
            <div className="flex gap-4">
              <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
                {common.BSIT.span1}
              </span>
              <span className="text-[#3d6969] text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
                {common.BSIT.span2}
              </span>
            </div>
            <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
              {common.BSIT.span3}
            </span>
          </h1>
        </div>
      </section>

      <section className="flex w-full justify-center bg-gradient-to-r from-amber-300 to-yellow-50 min-h-[75vh] p-7">
        <div className="flex py-4 w-[75%] justify-between gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-3xl">Contents:</h1>
            <Link className="font-medium text-xl text-green-950 hover:underline mt-2">
              <p>{common.PUScontents.pg}</p>
            </Link>
            <Link className="font-medium text-xl text-green-950 hover:underline mt-2">
              <p>{common.PUScontents.op}</p>
            </Link>
            <Link className="font-medium text-xl text-green-950 hover:underline mt-2">
              <p>{common.PUScontents.aus}</p>
            </Link>
            <Link className="font-medium text-xl text-green-950 hover:underline mt-2">
              <p>{common.PUScontents.pvp}</p>
            </Link>
          </div>
          <div className="flex justify-center w-[65%]">
            <iframe
              className="w-full aspect-video ..."
              src="https://fb.watch/sKQ2fGCTvu/"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="bg-red-50 min-h-[80vh]">
        <div className=" w-full flex flex-col  justify-center">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
          >
            <header className="border w-full text-center h-full py-10">
              <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                {common.programDescription.title}
              </h2>
            </header>
          </div>
          <div className="flex justify-between py-10 bg-white min-h-[70vh]">
            <div></div>
            <div className="flex w-9/12 text-center py-10">
              <article className="">
                <p className="text-2xl">{common.programDescription.content}</p>
              </article>
            </div>
            <div></div>
          </div>
        </div>
      </section>

      <section className="bg-white min-h-[100vh]">
        <div className=" w-full flex flex-col items-center justify-center">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
          >
            <header className="border w-full text-center h-full py-10">
              <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                {common.objOfTheProgram.title}
              </h2>
            </header>
          </div>
          <article className="w-full flex flex-col items-center justify-center py-16 px-32">
            <div className="text-justify flex flex-col gap-3">
              <p className="text-lg md:text-xl lg:text-2xl">
                {common.objOfTheProgram.content.obj1}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {common.objOfTheProgram.content.obj2}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {common.objOfTheProgram.content.obj3}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {common.objOfTheProgram.content.obj4}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {common.objOfTheProgram.content.obj5}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {common.objOfTheProgram.content.obj6}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white min-h-[100vh]">
        <div
          className="w-full text-center select-none bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHeader.bgheader3})` }}
        >
          <header className="border w-full text-center h-full py-10">
            <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
              {common.underSurvey.title}
            </h2>
          </header>
        </div>
        <div className="text-center py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(common.underSurvey.content).map((item, index) => (
            <div key={index} className="flex flex-col items-center py-2">
              <img src={common.underSurvey.icon} className="w-60 h-60 mb-2" />
              <h3 className="text-xl md:text-md lg:text-xl">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 min-h-[50vh]">
        Program Video Promotion
      </section>
    </MainLayout>
  );
}

export default BSIT;
