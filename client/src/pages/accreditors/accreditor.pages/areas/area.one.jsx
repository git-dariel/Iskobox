import React, { useState, useEffect } from "react";
import common from "@/configs/common.config";
import MainLayout from "../../layout/main.layout";
import { Link } from "react-router-dom";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { fetchAreaOneFoldersAndFiles } from "@/services/folders/folder.service";

const AreaOne = () => {
  const [areaOneData, setAreaOneData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAreaOneFoldersAndFiles();
      setAreaOneData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <MainLayout>
        <section
          className="relative min-h-[40rem] select-none bg-cover bg-no-repeat bg-center shadow-xl flex justify-center items-center"
          style={{ backgroundImage: `url(${common.BSIT.icon})` }}
        >
          <div className="absolute inset-0 bg-teal-950 bg-opacity-50"></div>
          <div className="relative w-full h-full flex items-center">
            <h1 className="flex flex-col items-start px-20 md:px-32 lg:px-40 md:gap-3 xl:gap-6">
              <div className="flex gap-4">
                <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue mb-2">
                  {common.AREAONE.span1}
                </span>
              </div>
              <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
                {common.AREAONE.span2}
              </span>
            </h1>
          </div>
        </section>

        <section className="flex w-full justify-center bg-gradient-to-r from-amber-300 to-yellow-50 min-h-[45vh] p-7">
          <div className="flex py-4 w-[75%] justify-between gap-5">
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-3xl">Contents:</h1>
              <Link className="font-medium text-xl text-green-950 hover:underline mt-2">
                <p>{common.AREAONE_CONTENTS.DESC}</p>
              </Link>
              <Link className="font-medium text-xl text-green-950 hover:underline mt-2">
                <p>{common.AREAONE_CONTENTS.PARAMETER_A}</p>
              </Link>
              <Link className="font-medium text-xl text-green-950 hover:underline mt-2">
                <p>{common.AREAONE_CONTENTS.PARAMETER_B}</p>
              </Link>
            </div>
            <div className="flex flex-col  w-[65%] text-justify">
              <h1 className="text-4xl font-bold mb-3">{common.AREAONE_CONTENTS.DESC}</h1>
              <p className="text-lg">{common.AREAONE_CONTENTS.DESC_CONTENT}</p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] w-full flex flex-col">
          <div className="w-full flex flex-col justify-center items-center">
            <div
              className="w-full text-center select-none bg-no-repeat bg-cover bg-center shadow-xl"
              style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
            >
              <header className="border w-full text-center h-full py-10">
                <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                  {areaOneData.map((folder) => folder.name).join(", ")}
                </h2>
              </header>
            </div>
            <div className="flex w-9/12 text-justify py-10">
              {areaOneData.map((folder) => (
                <article key={folder.id}>
                  <h3 className="text-2xl font-bold">{folder.name}</h3>
                  <ul>
                    {folder.files.map((file) => (
                      <li key={file.id}>{file.name}</li>
                    ))}
                  </ul>
                  {folder.subfolders.map((subfolder) => (
                    <div key={subfolder.id}>
                      <h4 className="text-xl font-semibold">{subfolder.name}</h4>
                      <ul>
                        {subfolder.files.map((file) => (
                          <li key={file.id}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default AreaOne;
