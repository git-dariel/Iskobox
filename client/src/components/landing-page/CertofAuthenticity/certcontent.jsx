import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { CertData } from "@/configs/LanfingPageConfigs/certificate.data";

// Setting up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function CertContent() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex justify-center items-center w-full h-full bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]">
      <div className="w-full max-w-3xl">
        <Document
          className="border-2 shadow-lg my-10 w-full h-full"
          file={CertData.certificate}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            className="w-full"
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
