import { CARO, administration, studentaffair } from "@/configs/LanfingPageConfigs/administrationpge";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";

export default function StudentAffair() {
  return (
    <>
      <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] ">
        <div
          className="w-full h-auto text-center select-none bg-cover bg-no-repeat bg-center shadow-xl "
          style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
        >
          <div className="">
            <h1 className="text-[#334747] text-lg font-extrabold md:text-3xl px-10 py-10 flex flex-col">
              {administration.studentaffair}
            </h1>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-8 lg:gap-0 lg:flex-row py-10 justify-center">
          <div className="flex flex-col items-center gap-4 w-full lg:w-[40%] h-full py-4">
            <div className="flex justify-center">
              <img
                src={administration.studentaffairimg}
                alt="Director"
                className="w-[300px] h-auto rounded-md shadow-lg"
              />
            </div>
            <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-xl">
              <span className="text-md">{administration.studentaffairname}</span>
              <span className="text-sm">
                {administration.studentaffairposition}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentaffair.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-4 py-4 ${
                index >= 4 ? "col-span-2 justify-self-center" : ""
              }`}
            >
              <div className="flex justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[300px] h-auto rounded-md shadow-lg"
                />
              </div>
              <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-xl">
                <span className="text-md text-center">{item.name}</span>
                <span className="text-sm">{item.position}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-auto flex flex-col gap-8 lg:gap-0 lg:flex-row py-10 justify-center">
          <div className="flex flex-col items-center gap-4 w-full lg:w-[40%] h-full py-4">
            <div className="flex justify-center">
              <img
                src={administration.CAROimg}
                alt= {administration.CAROposition}
                className="w-[300px] h-auto rounded-md shadow-lg"
              />
            </div>
            <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-xl">
              <span className="text-md">{administration.CAROname}</span>
              <span className="text-sm">
                {administration.CAROposition}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {CARO.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-4 py-4 ${
                index >= 4 ? "col-span-2 justify-self-center" : ""
              }`}
            >
              <div className="flex justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[300px] h-auto rounded-md shadow-lg"
                />
              </div>
              <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-xl">
                <span className="text-md text-center">{item.name}</span>
                <span className="text-sm">{item.position}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
