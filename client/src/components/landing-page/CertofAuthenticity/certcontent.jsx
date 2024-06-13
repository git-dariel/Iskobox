import { useState } from "react";
import { Document, Page } from "react-pdf";
import { CertData } from "@/configs/LanfingPageConfigs/certificate.data";

export default function CertContent() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="">
        <Document
          className="border-2 shadow-lg my-10 w-full h-full "
          file={CertData.certificate}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            classname="w-[300px] md:w-[500px] lg:w-[800px]"
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
