import {
  administration,
  faculties,
} from "@/configs/LanfingPageConfigs/administrationpge";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";

export default function Faculties() {
  return (
    <>
      <section className="bg-gray-300">
        {/* Header Section */}
        <div
          className="w-full h-auto text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
          style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
        >
          <div>
            <h1 className="text-[#334747] text-lg font-extrabold md:text-3xl px-10 py-10 flex flex-col">
              {administration.facultiest}
            </h1>
          </div>
        </div>

        {/* Academic Staff Section */}
        <div className=" p-20  grid grid-cols-1 lg:px-40 sm:grid-cols-2 lg:grid-cols-3 gap-8" >
          {faculties.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-4 py-4 bg-white shadow-lg rounded-lg"
            >
              <div className="flex justify-center ">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[300px] h-auto rounded-md border shadow-lg"
                />
              </div>
              <div className="text-[#334747] flex justify-center items-center flex-col font-bold  bg-white w-full ">
                <span className="text-md text-center">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
