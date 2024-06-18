import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import {
  building,
  buildingv2,
  data,
  facilities,
  facilitiesv2,
} from "@/configs/LanfingPageConfigs/facilitiespage";

export default function FacilitiesContent() {
  return (
    <>
      <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]  w-full ">
        <div className=" w-full flex flex-col  justify-center  ">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
          >
            <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
              <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                {data.title}
              </h2>
            </header>
          </div>
          <div className="px-20 lg:px-40 py-10">
            <div className="relative   " style={{ paddingTop: "56.25%" }}>
              {/* 16:9 aspect ratio (h/w * 100) */}
              <iframe
                src={data.video}
                className="absolute inset-0 w-full h-full rounded-md shadow-xl"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div>
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
          >
            <header className=" w-full px-20 lg:px-30 xl:px-40 h-full py-10">
              <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                {data.buildingtitle}
              </h2>
            </header>
          </div>
          {building.map((items) => (
            <div key={items.id} className=" ">
              <div className="w-full pb-10  ">
                <header className="w-full px-20 lg:px-30 xl:px-40 h-full py-10 flex lg:flex-row flex-col lg:gap-8">
                  <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#3a3834]">
                    {items.building}
                  </h2>
                  <h2 className="font-bold text-3xl md:text-3xl lg:text-3xl pt-1 text-[#3a3834]">
                    {items.title}
                  </h2>
                </header>
                <div className=" h-full px-20  flex justify-center ">
                  <div className=" h-full w-full max-w-screen-lg">
                    <img
                      src={items.img}
                      className="flex object-center z-[10] shadow-lg rounded"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="border mx-10 mt-10 border-[#3a3834]"></div> */}
            </div>
          ))}

          <div className="w-full pb-10  ">
            <header className="w-full px-20 lg:px-30 xl:px-40 h-full py-10 flex lg:flex-row flex-col lg:gap-8">
              <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#3a3834]">
                {data.buildingD}
              </h2>
              <h2 className="font-bold text-3xl md:text-3xl lg:text-3xl pt-1 text-[#3a3834]">
                {data.buildingtitle}
              </h2>
            </header>
            <div className="flex flex-col gap-4">
              <div className=" h-full px-20 lg:px-40  flex justify-center gap-4 ">
                <div className=" flex lg:flex-row h-full w-full max-w-screen-lg">
                  <img
                    src={data.buildingDimg1}
                    className="h-auto object-center z-[10] shadow-lg rounded"
                  />
                </div>
                <div className="  w-[48%] h-auto max-w-screen-lg">
                  <img
                    src={data.buildingDimg2}
                    className="flex object-center z-[10] shadow-lg rounded"
                  />
                </div>
              </div>

              <div className=" h-full px-20 lg:px-40  flex justify-center gap-4 flex-row-reverse">
                <div className=" flex lg:flex-row h-full w-full max-w-screen-lg">
                  <img
                    src={data.buildingDimg4}
                    className="h-auto object-center z-[10] shadow-lg rounded"
                  />
                </div>
                <div className=" w-[48%] h-auto max-w-screen-lg">
                  <img
                    src={data.buildingDimg3}
                    className="flex object-center z-[10] shadow-lg rounded"
                  />
                </div>
              </div>
            </div>

            {buildingv2.map((items) => (
              <div key={items.id} className=" ">
                <div className="w-full pb-10  ">
                  <header className="w-full px-20 lg:px-30 xl:px-40 h-full py-10 flex lg:flex-row flex-col lg:gap-8">
                    <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#3a3834]">
                      {items.building}
                    </h2>
                    <h2 className="font-bold text-3xl md:text-3xl lg:text-3xl pt-1 text-[#3a3834]">
                      {items.title}
                    </h2>
                  </header>
                  <div className=" h-full px-20  flex justify-center ">
                    <div className=" h-full w-full max-w-screen-lg">
                      <img
                        src={items.img}
                        className="flex object-center z-[10] shadow-lg rounded"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="border mx-10 mt-10 border-[#3a3834]"></div> */}
              </div>
            ))}

            <div
              className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
              style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
            >
              <header className=" w-full px-20 lg:px-30 xl:px-40 h-full py-10">
                <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                  {data.facilititestitle}
                </h2>
              </header>
            </div>

            {facilities.map((items) => (
              <div key={items.id} className=" ">
                <div className="w-full pb-10  ">
                  <header className="w-full px-20 lg:px-30 xl:px-40 h-full py-10 lg:gap-8">
                    <h2 className="font-bold text-3xl md:text-3xl lg:text-5xl pt-1 text-[#3a3834]">
                      {items.title}
                    </h2>
                  </header>
                  <div className=" h-full px-20  flex justify-center ">
                    <div className=" h-full w-full max-w-screen-lg">
                      <img
                        src={items.img}
                        className="flex object-center z-[10] shadow-lg rounded"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="border mx-10 mt-10 border-[#3a3834]"></div> */}
              </div>
            ))}

            {facilitiesv2.map((items) => (
              <div key={items.id} className=" ">
                <div className="w-full pb-10  ">
                  <header className="w-full px-20 lg:px-30 xl:px-40 h-full py-10 lg:gap-8">
                    <h2 className="font-bold text-3xl md:text-3xl lg:text-5xl pt-1 text-[#3a3834]">
                      {items.title}
                    </h2>
                  </header>
                  <div className=" h-full px-20 lg:px-40  flex justify-center gap-4 ">
                    <div className=" flex lg:flex-row h-full w-full max-w-screen-lg">
                      <img
                        src={items.img1}
                        className="h-auto object-center z-[10] shadow-lg rounded"
                      />
                    </div>
                    <div className=" flex flex-col w-[48%]  max-w-screen-lg gap-4">
                      <img
                        src={items.img2}
                        className="flex object-center z-[10] shadow-lg rounded h-[50%]"
                      />
                      <img
                        src={items.img3}
                        className="flex object-center z-[10] shadow-lg rounded h-[50%]"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="border mx-10 mt-10 border-[#3a3834]"></div> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
