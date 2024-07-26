import React  from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { CertData } from "@/configs/LanfingPageConfigs/certificate.data";

export default function CertContent() {

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-4 md:p-8 bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]">
    <div className="w-full max-w-[50rem] h-full bg-white shadow-lg rounded-lg overflow-hidden mb-5 flex justify-center items-center">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer
          className="flex justify-center items-center"
          fileUrl={CertData.certificate}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Worker>
    </div>
    <div className="flex w-full justify-center items-center">
      <a
        href={CertData.certificate}
        download="certificate.pdf"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Download PDF
      </a>
    </div>
  </div>
  );
}
