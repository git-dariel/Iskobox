import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import {
  administration,
  Area,
} from "@/configs/LanfingPageConfigs/administrationpge";

export default function TaskForce() {
  return (
    <>
      <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] ">
        <div
          className="w-full h-auto text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
          style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
        >
          <div className="">
            <h1 className="text-[#334747] text-lg font-extrabold md:text-3xl px-10 py-10 flex flex-col">
              {administration.accretaskforce}
            </h1>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-8 lg:gap-0 py-10 justify-center items-center">
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

          <div className="flex flex-col items-center gap-4 w-full lg:w-[40%] h-full py-4">
            <div className="flex justify-center">
              <img
                src={administration.qacimg}
                alt="Director"
                className="w-[300px] h-auto rounded-md shadow-lg"
              />
            </div>
            <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-xl text-center">
              <span className="text-md">{administration.qacname}</span>
              <span className="text-sm">{administration.qacposition}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="border flex flex-col justify-center items-center ">
          {Area.map((item) => (
            <div
              key={item.id}
              className="w-full justify-center items-center h-full flex flex-col"
            >
              <div
                className="w-full h-auto text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
                style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
              >
                <div className="">
                  <h1 className="text-[#334747] text-lg font-extrabold md:text-3xl px-10 py-10 flex flex-col">
                    {item.title}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center my-20 gap-8">
                {item.Img.map((imgItem) => (
                  <div
                    key={imgItem.id}
                    className="flex flex-col items-center gap-4 py-4"
                  >
                    <div className="flex justify-center">
                      <img
                        src={imgItem.img}
                        alt={imgItem.name}
                        className="w-[300px] h-[300px] rounded-md shadow-lg"
                      />
                    </div>
                    <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-xl">
                      <span className="text-md">{imgItem.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
