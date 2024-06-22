import React from "react";
import MainLayout from "../../layout/main.layout";
import { Link } from "react-router-dom";
import documents_links from "@/configs/documents.config";

const Syllabi = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center bg-gray-50 h-[69vh]">
        <Link to={documents_links.syllabi}>
          <div className="bg-red-50">Click me!</div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Syllabi;
