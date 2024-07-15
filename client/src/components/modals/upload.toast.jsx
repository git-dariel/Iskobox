import React from "react";
import { useToast } from "sonner";
import ProgressBar from "../ui/line.progressbar";

const UploadToast = ({ fileCount, totalProgress }) => {
  const { toast } = useToast();

  const showToast = () => {
    toast.custom(
      () => (
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V2.5A1.5 1.5 0 0010.5 1h-2A1.5 1.5 0 007 2.5V4a8 8 0 017.75 8.5 1.5 1.5 0 01-3 0 5 5 0 10-5-5V7a1.5 1.5 0 00-3 0v2.5A1.5 1.5 0 008.5 11h2a1.5 1.5 0 001.5-1.5V8a8 8 0 01-8 8z"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-medium">
              Uploading {fileCount} file(s)
            </div>
            <div className="w-full mt-1">
              <ProgressBar completed={totalProgress} />
            </div>
          </div>
        </div>
      ),
      {
        duration: null, // Keep the toast until manually dismissed
        closeOnClick: false, // Prevent auto-dismiss on click
      }
    );
  };

  return (
    <button
      onClick={showToast}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
    >
      Show Upload Toast
    </button>
  );
};

export default UploadToast;
