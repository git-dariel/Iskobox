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

      <section className="flex w-full items-center justify-center bg-gradient-to-r from-amber-300 to-yellow-50 min-h-[50vh] p-7">
        <div className="flex w-[57%] justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-lg">Contents:</h1>
            {common.undersurvey.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="font-medium text-green-950 hover:underline"
              >
                {item.text}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center w-[65%]">
            <iframe
              className="w-full aspect-video ..."
              src="https://fb.watch/sKQ2fGCTvu/"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="bg-red-50 min-h-[50vh]">Program Description</section>

      <section className="bg-blue-50 min-h-[50vh]">
        Objectives of the Program
      </section>

      <section className="bg-red-50 min-h-[50vh]">Areas Under Survey</section>

      <section className="bg-blue-50 min-h-[50vh]">
        Program Video Promotion
      </section>
    </MainLayout>
  );
}

export default BSIT;
