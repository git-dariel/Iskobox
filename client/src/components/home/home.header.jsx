import UserProfile from "@/components/users/user-profile";
import { useAuth } from "@/helpers/auth.context";
import React, { useState } from "react";
import AddNewButton from "../common/buttons/add.new";
import FileFolderButton from "../common/buttons/file.folder";
import Notification from "../common/buttons/notification";
import ToggleViewButton from "../common/buttons/toggle.view";
import FolderTagModal from "../modals/folder.tag";

const Header = ({ selectedButton, handleButtonClick, isGridView, toggleView, currentFolderId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-white max-w-full rounded-t-xl">
      <div className="mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-gray-800 font-bold pl-3 pr-1">
            {currentUser
              ? `${getGreeting()}, ${currentUser.firstname} ${currentUser.lastname}`
              : "Iskobox"}
          </h1>
          <div className="flex">
            <Notification />
            <UserProfile />
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="absolute bg-white w-full shadow-md rounded-lg mt-2 p-4 z-20">
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className="border-b py-2">
                  {result.type === "folder" ? "📁" : "📄"} {result.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex p-3">
          <div className="flex gap-1">
            <FileFolderButton
              selectedButton={selectedButton}
              handleButtonClick={handleButtonClick}
            />
            <AddNewButton parentId={currentFolderId} />
          </div>

          <div className="flex justify-end gap-2 w-full">
            <div className="hidden md:flex">
              <ToggleViewButton isGridView={isGridView} toggleView={toggleView} />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <FolderTagModal folderId={currentFolderId} onClose={toggleModal} />}
    </div>
  );
};

export default Header;
