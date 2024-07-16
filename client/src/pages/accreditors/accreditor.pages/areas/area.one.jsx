import React, { useState, useEffect, useRef } from "react";
import common from "@/configs/common.config";
import MainLayout from "../../layout/main.layout";
import { Link } from "react-router-dom";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { fetchAreaOneFoldersAndFiles } from "@/services/folders/folder.service";
import { Paperclip, Fullscreen } from "lucide-react";
import { getFileType } from "@/helpers/file-helpers";
import { getFileUrl } from "@/services/files/file-service";
import StarsCanvas from "@/components/layout/starcanvas";
import documents_links from "@/configs/documents.config";
import { FaRegWindowClose } from "react-icons/fa";

const AreaOne = () => {

  const slideInKeyframes = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

  const slideOutKeyframes = `
  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;

  // Add keyframes to the global styles
  const GlobalStyles = () => (
    <style>
      {slideInKeyframes}
      {slideOutKeyframes}
    </style>
  );

  const googleDriveLinkPPP = documents_links.areaone_ppp;
  const embedLinkPPP = googleDriveLinkPPP.replace(
    "/view?usp=sharing",
    "/preview"
  );
  const googleDriveLinkSLF = documents_links.areaone_slf;
  const embedLinkSLF = googleDriveLinkSLF.replace(
    "/view?usp=sharing",
    "/preview"
  );
  const [areaOneData, setAreaOneData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState(null);
  const iframeRef = useRef(null);

  const openModal = async (file) => {
    const url = await getFileUrl(file.id);
    const fileType = getFileType(file.name);
    const name = file.name;

    if (
      fileType === "image" ||
      fileType === "pdf" ||
      fileType === "docx" ||
      fileType === "pptx" ||
      fileType === "xlsx"
    ) {
      let contentUrl = null;
      if (fileType === "pdf") {
        contentUrl = url;
      } else {
        contentUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
          url
        )}&embedded=true`;
      }
      setName(name);
      setSelectedFile(contentUrl);
      setModalOpen(false); // Close the current modal
      setTimeout(() => {
        setModalOpen(true); // Open the new modal with slideIn animation
      }, 100);
    } else {
      console.error("File format not supported for preview.");
    }
  };

  const closeModal = () => {
    setSelectedFile(null);
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAreaOneFoldersAndFiles();
      setAreaOneData(data);
    };

    fetchData();
  }, []);

  const toggleFullScreen = () => {
    if (iframeRef.current) {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          iframeRef.current.style.transform = "scale(1)"; // Reset zoom to normal size
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
          iframeRef.current.style.transform = "scale(1)"; // Reset zoom to normal size
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
          iframeRef.current.style.transform = "scale(1)"; // Reset zoom to normal size
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
          iframeRef.current.style.transform = "scale(1)"; // Reset zoom to normal size
        }
      } else {
        if (iframeRef.current.requestFullscreen) {
          iframeRef.current.requestFullscreen();
          iframeRef.current.style.transform = "scale(1)"; // Reset zoom to normal size
        } else if (iframeRef.current.mozRequestFullScreen) {
          iframeRef.current.mozRequestFullScreen();
          iframeRef.current.style.transform = "scale(1)"; // Reset zoom to normal size
        } else if (iframeRef.current.webkitRequestFullscreen) {
          iframeRef.current.webkitRequestFullscreen();
          iframeRef.current.style.transform = "scale(1)"; // Reset zoom to normal size
        } else if (iframeRef.current.msRequestFullscreen) {
          iframeRef.current.msRequestFullscreen();
          iframeRef.current.style.transform = "scale(1)"; // Reset zoom to normal size
        }
      }
    }
  };

  return (
    <>
      <MainLayout>
        <section
          className="relative min-h-[20rem] select-none bg-cover bg-no-repeat bg-center shadow-xl flex justify-center items-center"
          style={{ backgroundImage: `url(${common.BSIT.icon})` }}
        >
          <div className="absolute inset-0 bg-teal-950 bg-opacity-80"></div>
          <div className="relative w-full h-full flex items-center">
            <h1 className="flex flex-col items-start px-20 md:px-32 lg:px-40 md:gap-3 xl:gap-6 animate-pulse duration-800">
              <StarsCanvas />
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

        <section className="flex w-full justify-center bg-gradient-to-r from-amber-300 to-yellow-50 min-h-[40vh] p-7">
          <div className="flex py-4 md:w-[75%] justify-between gap-5">
            <div className="flex flex-col text-justify">
              <h1 className="md:text-2xl text-base font-bold mb-5">
                {common.AREAONE_CONTENTS.DESC}
              </h1>
              <p className="md:text-lg text-sm">
                {common.AREAONE_CONTENTS.DESC_CONTENT}
              </p>
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
                <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
                  {common.AREAONE.ppp}
                </h2>
              </header>
            </div>

            <div className="md:w-[100vh] md:h-[90vh] w-[40vh] h-[50vh] flex items-center justify-center bg-transparent my-10">
              <iframe
                src={embedLinkPPP}
                className="w-full h-full border-none"
                allow="autoplay"
              ></iframe>
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
                <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
                  {common.AREAONE.slf}
                </h2>
              </header>
            </div>

            <div className="md:w-[100vh] md:h-[90vh] w-[40vh] h-[50vh] flex items-center justify-center bg-transparent my-10">
              <iframe
                src={embedLinkSLF}
                className="w-full h-full border-none"
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] w-full flex flex-col">
          <div className="w-full flex flex-col justify-center items-center">
            {areaOneData.map((folder) => (
              <div key={folder.id} className="w-full">
                {folder.subfolders.map((subfolder) => (
                  <>
                    <div
                      className="w-full text-center select-none bg-no-repeat bg-cover bg-center shadow-xl"
                      style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
                    >
                      <header className="border w-full text-center h-full py-10">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-lg md:text-3xl font-bold text-gray-700">
                            {subfolder.name}
                          </h3>

                          {subfolder.name === "Parameter A" && (
                            <p className="text-sm md:text-base">
                              Statement of Vision, Mission, Goals, and
                              Objectives
                            </p>
                          )}

                          {subfolder.name === "Parameter B" && (
                            <p className="text-sm md:text-base">
                              Dissemination and acceptability
                            </p>
                          )}
                        </div>
                      </header>
                    </div>
                    <div
                      key={subfolder.id}
                      className="flex items-center justify-center text-justify py-10"
                    >
                      <div className="bg-white w-[50rem] p-10 rounded-lg">
                        <ul>
                          {subfolder.files.length > 0 ? (
                            subfolder.files.map((file) => (
                              <li
                                key={file.id}
                                className="flex gap-2 items-center cursor-pointer hover:text-blue-500 md:text-base text-sm"
                                onClick={() => openModal(file)}
                              >
                                <Paperclip size={15} /> {file.name}
                              </li>
                            ))
                          ) : (
                            <li>No files</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                ))}
                <div
                  className="w-full text-center select-none bg-no-repeat bg-cover bg-center shadow-xl"
                  style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
                >
                  <header className="border w-full text-center h-full py-10">
                    <h3 className="text-lg md:text-3xl font-bold text-gray-700">
                      Other Files
                    </h3>
                  </header>
                </div>
                <div className="flex items-center justify-center text-justify py-10">
                  <div className="bg-white w-[50rem] p-10 rounded-lg">
                    <ul>
                      {folder.files.length > 0 ? (
                        folder.files.map((file) => (
                          <li
                            key={file.id}
                            className="flex gap-2 items-center cursor-pointer hover:text-blue-500 md:text-base text-sm"
                            onClick={() => openModal(file)}
                          >
                            <Paperclip size={15} /> {file.name}
                          </li>
                        ))
                      ) : (
                        <li>No files</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="items-center gap-5 bg-white shadow-lg rounded-lg grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 justify-center p-10 md:text-base text-sm">
          <Link to="/programs-under-survey/areaone">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 1
            </button>
          </Link>
          <Link to="/programs-under-survey/areatwo">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 2
            </button>
          </Link>
          <Link to="/programs-under-survey/areathree">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 3
            </button>
          </Link>
          <Link to="/programs-under-survey/areafour">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 4
            </button>
          </Link>
          <Link to="/programs-under-survey/areafive">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 5
            </button>
          </Link>
          <Link to="/programs-under-survey/areasix">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 6
            </button>
          </Link>
          <Link to="/programs-under-survey/areaseven">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 7
            </button>
          </Link>
          <Link to="/programs-under-survey/areaeight">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 8
            </button>
          </Link>
          <Link to="/programs-under-survey/areanine">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 9
            </button>
          </Link>
          <Link to="/programs-under-survey/areaten">
            <button className="bg-orange-700 p-3 w-[8rem] rounded-md text-white transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105">
              Area 10s
            </button>
          </Link>
        </div>
      </MainLayout>

      {modalOpen && (
        <>
          <GlobalStyles />
          <div
            className="fixed inset-y-0 right-0 z-50 flex items-center shadow-2xl w-1/2 bg-black bg-opacity-0 transition-opacity duration-5000 ease-in-out"
            style={{
              animation: `${
                modalOpen ? "slideIn 2s forwards" : "slideOut 2s forwards"
              }`,
            }}
          >
            <div className="bg-white w-full h-full p-4 overflow-y-auto">
              <div className="flex justify-between">
                <p>{name}</p>
                <div className="flex justify-between gap-8">
                  <button onClick={toggleFullScreen} className="flex gap-2">
                    <Fullscreen />
                    Fullscreen
                  </button>
                  <button className="text-black text-2xl" onClick={closeModal}>
                    <FaRegWindowClose />
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <iframe
                  ref={iframeRef}
                  src={selectedFile}
                  className="w-full h-[92vh] border-none rounded-md"
                  allow="autoplay fullview justify"
                  style={{ margin: "auto" }}
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AreaOne;
