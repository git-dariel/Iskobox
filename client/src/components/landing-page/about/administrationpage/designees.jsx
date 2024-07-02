import { administration, designees } from "@/configs/LanfingPageConfigs/administrationpge";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";

export default function Designees() {
  return (
    <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] ">
      <div
        className="w-full h-auto text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
        style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
      >
        <div className="">
          <h1 className="text-[#334747] text-lg font-extrabold md:text-3xl px-10 py-10 flex flex-col">
            {administration.designees}
          </h1>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col gap-8 lg:gap-0 lg:flex-row py-10 justify-center">
        <div className="flex flex-col items-center gap-4 w-full lg:w-[40%] h-full py-4">
          <div className="flex justify-center">
            <img
              src={administration.directorimg}
              alt="Director"
              className="w-[300px] h-auto rounded-md shadow-lg"
            />
          </div>
          <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-xl text-center">
            <span className="text-md">{administration.directorname}</span>
            <span className="text-sm">{administration.directorposition}</span>
          </div>
        </div>
      </div>
      
    <div className="flex flex-col lg:flex-row justify-center items-center  px-10">
      {designees.map((item) => (
        <div key={item.id} className=" w-full  justify-center items-center h-full flex flex-row gap-10 lg:gap-0  py-10 text-center">
          <div className="flex flex-col items-center gap-4  py-4 ">
            <div className="flex justify-center">
              <img
                src={item.img}
                alt={item.name}
                className="w-[300px] h-auto rounded-md shadow-lg"
              />
            </div>
            <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-xl">
              <span className="text-md">{item.name}</span>
              <span className="text-sm">{item.position}</span>
            </div>
          </div>
        </div>
      ))}
      </div>
    </section>
  );
}
