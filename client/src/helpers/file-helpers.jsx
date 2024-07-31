import React from "react";
import { File, FileText, Image, Video, Music, FilePlus } from "lucide-react";

export function getFileIcon(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <Image className="w-5 h-5 text-gray-500" />;
    case "pdf":
      return <File className="w-5 h-5 text-red-500" />;
    case "doc":
    case "docx":
      return <FileText className="w-5 h-5 text-blue-500" />;
    case "ppt":
    case "pptx":
      return <FilePlus className="w-5 h-5 text-orange-500" />; // Using FilePlus as a placeholder
    case "xls":
    case "xlsx":
      return <FilePlus className="w-5 h-5 text-green-500" />; // Using FilePlus as a placeholder
    case "mp4":
    case "avi":
    case "mov":
      return <Video className="w-5 h-5 text-green-500" />;
    case "mp3":
      return <Music className="w-5 h-5 text-purple-500" />;
    default:
      return <File className="w-5 h-5 text-gray-500" />;
  }
}

export function isImageFile(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();
  return ["jpg", "jpeg", "png", "gif"].includes(extension);
}

export function truncateFileName(fileName, maxLength = 20) {
  if (fileName.length <= maxLength) return fileName;
  const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
  const baseName = fileName.substring(0, fileName.lastIndexOf("."));
  if (baseName.length <= maxLength - (extension.length + 3)) {
    return fileName;
  }
  return `${baseName.substring(0, maxLength - (extension.length + 3))}...${extension}`;
}

export const isViewableFile = (fileName) => {
  return /\.(pdf|docx|png|jpg|jpeg|mp4|avi|mov)$/i.test(fileName);
};

export const getFileType = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase(); // Ensure case insensitivity

  if (["jpg", "jpeg", "png", "webp"].includes(extension)) return "image";
  if (extension === "pdf") return "pdf";
  if (extension === "docx") return "docx";
  if (["mp4", "avi", "mov", "webm"].includes(extension)) return "video"; // Group video formats
  if (extension === "mp3") return "audio";

  return "unsupported";
};

// export const getFileType = (fileName) => {
//   if (/\.(jpg|jpeg|png|webp)$/i.test(fileName)) return "image";
//   if (/\.pdf$/i.test(fileName)) return "pdf";
//   if (/\.docx$/i.test(fileName)) return "docx";
//   if (/\.(mp4|avi|mov|webm)$/i.test(fileName)) return "video";
//   if (/\.(mp4|avi|mov|webm)$/i.test(fileName)) return "mp4";
//   if (/\.mp3$/i.test(fileName)) return "audio";

//   return "unsupported";
// };
