import React from "react";
import { File, FileText, Image } from "lucide-react";

export function getFileIcon(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <Image className="w-12 h-12 text-gray-500" />;
    case "pdf":
      return <File className="w-12 h-12 text-red-500" />;
    case "doc":
    case "docx":
      return <FileText className="w-12 h-12 text-blue-500" />;
    default:
      return <File className="w-12 h-12 text-gray-500" />;
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
  return `${baseName.substring(
    0,
    maxLength - (extension.length + 3)
  )}...${extension}`;
}
