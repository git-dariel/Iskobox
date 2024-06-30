import { Link } from "react-router-dom";
import MainLayout from "../layout/main.layout";
import common from "@/configs/common.config";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";

export default function ProgramsUnderSurvey() {
  return (
    <MainLayout>
      <section
        className="min-h-[17rem] select-none bg-cover bg-no-repeat bg-center shadow-xl flex justify-center items-center"
        style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
      >
        <div className=" w-full h-full flex items-center">
          <h1 className=" flex flex-col items-start px-20 md:px-32 lg:px-40 md:gap-3 xl:gap-6">
            <div className="flex gap-4">
              <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem]  font-bebas-neue ">
                {common.PUS.span1}
              </span>
              <span className="text-[#3d6969] text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
                {common.PUS.span2}
              </span>
            </div>
            <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
              {common.PUS.span3}
            </span>
          </h1>
        </div>
      </section>
      <section className="bg-gradient-to-r from-amber-300 to-yellow-50 p-7">
        <div className="flex justify-center mb-3">
          <Link to="/programs-under-survey/bsit" className="text-green-950 hover:underline">
            <span className="inline-flex items-center rounded-md bg-rose-900 px-2 py-1 text-sm md:text-base font-medium text-white ring-1 ring-inset ring-gray-500/10">
              BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY
            </span>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link to="/programs-under-survey/bsit" className="text-green-950 hover:underline">
            <img src={common.PUS.icon} alt="" />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
