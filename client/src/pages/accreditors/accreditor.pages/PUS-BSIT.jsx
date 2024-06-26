import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import MainLayout from "../layout/main.layout";
import common from "@/configs/common.config";
import { Link } from "react-router-dom";
import { videos } from "@/configs/common.config";

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
              <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
                {common.BSIT.span2}
              </span>
            </div>
            <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
              {common.BSIT.span3}
            </span>
          </h1>
        </div>
      </section>

      <section className="flex w-full justify-center bg-gradient-to-r from-amber-300 to-yellow-50 md:min-h-[75vh] p-7">
        <div className="flex flex-col md:flex-row py-4 md:w-[75%] md:justify-between items-center gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-base text-center md:text-left md:text-2xl">
              Contents:
            </h1>
            <Link className="font-medium text-sm md:text-lg text-center md:text-left text-green-950 hover:underline mt-2">
              <p>{common.PUScontents.pg}</p>
            </Link>
            <Link className="font-medium text-sm md:text-lg text-center md:text-left text-green-950 hover:underline mt-2">
              <p>{common.PUScontents.op}</p>
            </Link>
            <Link className="font-medium text-sm md:text-lg text-center md:text-left text-green-950 hover:underline mt-2">
              <p>{common.PUScontents.aus}</p>
            </Link>
            <Link className="font-medium text-sm md:text-lg text-center md:text-left text-green-950 hover:underline mt-2">
              <p>{common.PUScontents.pvp}</p>
            </Link>
          </div>
          <div className="flex justify-center md:w-[65%]">
            <iframe
              className="w-full aspect-video ..."
              allowFullScreen
              src="https://drive.google.com/file/d/1OWaxJCicXXCzF0NTBvsYzeV_zIzfylIH/preview"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] w-full flex flex-col">
        <div className=" w-full flex flex-col  justify-center items-center">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
          >
            <header className="border w-full text-center h-full py-10">
              <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
                {common.programDescription.title}
              </h2>
            </header>
          </div>

          <div className="flex px-6 md:w-9/12 md:text-justify py-10">
            <article>
              <p className="md:text-lg text-base">{common.programDescription.content}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] w-full flex flex-col">
        <div className=" w-full flex flex-col items-center justify-center">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
          >
            <header className="border w-full text-center h-full py-10">
              <h2 className="font-bold text-l md:text-3xl text-[#dca819]">
                {common.objOfTheProgram.title}
              </h2>
            </header>
          </div>
          <article className="md:w-full flex flex-col items-center justify-center md:py-16 md:px-32 p-7">
            <div className="md:text-justify flex flex-col gap-3 ">
              <p className="text-base md:text-lg">{common.objOfTheProgram.content.obj1}</p>
              <p className="text-base md:text-lg">{common.objOfTheProgram.content.obj2}</p>
              <p className="text-base md:text-lg">{common.objOfTheProgram.content.obj3}</p>
              <p className="text-base md:text-lg">{common.objOfTheProgram.content.obj4}</p>
              <p className="text-base md:text-lg">{common.objOfTheProgram.content.obj5}</p>
              <p className="text-base md:text-lg">{common.objOfTheProgram.content.obj6}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] w-full flex flex-col">
        <div
          className="w-full text-center select-none bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHeader.bgheader3})` }}
        >
          <header className="border w-full text-center h-full py-10">
            <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
              {common.underSurvey.title}
            </h2>
          </header>
        </div>
        <div className="text-center py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.keys(common.underSurvey.content).map((key, index) => (
            <div key={index} className="flex flex-col items-center py-2">
              <Link to={common.underSurvey.links[key]}>
                <img
                  src={common.underSurvey.icon[key.replace("aus", "area")]}
                  className="w-24 h-24 md:w-60 md:h-60 mb-2 cursor-pointer hover:scale-110 transition-transform duration-300"
                />
              </Link>
              <h3 className="text-sm md:text-lg">{common.underSurvey.content[key]}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]">
        <div
          className="w-full text-center select-none bg-no-repeat bg-cover bg-center shadow-xl"
          style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
        >
          <header className="w-full text-center h-full py-10">
            <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
              {common.programvideo.title}
            </h2>
          </header>
        </div>
        {videos.map((item) => (
          <div key={item.id} className="w-full flex flex-col justify-center">
            <div className="p-4 md:px-10">
              <div className="relative border border-black " style={{ paddingTop: "56.25%" }}>
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
    </MainLayout>
  );
}

export default BSIT;
