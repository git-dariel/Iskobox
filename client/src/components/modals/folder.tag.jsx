import React, { useEffect, useRef, useState } from "react";
import CircleButton from "../common/buttons/reusable/circle.button";
import { IoClose } from "react-icons/io5";
import CopyLinkButton from "../common/buttons/copylink";
import OvalButton from "../common/buttons/reusable/oval.button";
import DropdownButton from "../common/buttons/reusable/dropdown.button";
import common from "@/configs/common.config";
import { fetchAllUsers } from "@/services/users/user.service";
import { AiOutlinePlus } from "react-icons/ai";
import { Toaster, toast } from "sonner";
import { addAssigneeToFolder, fetchFolderDetails } from "@/services/folders/folder.service";
import { addNewNotification } from "@/services/notification/notif.service";
import { useUpdate } from "@/helpers/update.context";

const FolderTagModal = ({ folderId, onClose }) => {
  const modalRef = useRef(null);
  const [people, setPeople] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Uploader");
  const [allUsers, setAllUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [folder, setFolder] = useState({});
  const { triggerUpdate } = useUpdate();
  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await fetchAllUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    async function fetchFolder() {
      try {
        const folderDetails = await fetchFolderDetails(folderId);
        if (folderDetails) {
          setFolder(folderDetails);
        } else {
          toast.error("Folder not found. Please try again.");
          onClose();
        }
      } catch (error) {
        console.error("Error fetching folder:", error);
        toast.error("Failed to fetch folder. Please try again.");
      }
    }

    fetchUsers();
    fetchFolder();

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [folderId, onClose]);

  const onSelectRole = (roleId) => {
    const selectedOption = common.roleOptions.find((option) => option.id === roleId);
    setSelectedRole(selectedOption.label);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const addPerson = (user) => {
    if (user) {
      const newPerson = {
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      };
      setPeople([...people, newPerson]);
      setEmail("");
    }
  };

  const assignPersonToFolder = async () => {
    if (people.length === 0) {
      toast.error("Please add at least one person");
      return;
    }

    const assignProcess = async () => {
      for (const person of people) {
        const assigneeData = {
          userId: person.email,
          name: person.name,
          role: selectedRole,
          description: description,
        };

        const assignSubFolders = !folder.parentId;
        await addAssigneeToFolder(folderId, assigneeData, assignSubFolders);
        triggerUpdate();
        // Send a notification to the assigned user
        const notificationData = {
          userId: person.email,
          message: `You have been assigned to the folder "${folder.name}".`,
          timestamp: new Date().toISOString(),
        };
        await addNewNotification(notificationData, person.email);
        console.log(`Notification sent to ${person.email}`);
      }
      onClose();
      setEmail("");
      setDescription("");
    };

    toast.promise(assignProcess(), {
      loading: "Assigning people to folder...",
      success: "Assignee added successfully",
      error: (err) => err.message || "Failed to add assignee. Please try again.",
    });
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out z-[9999]">
        <Toaster />
        <div
          ref={modalRef}
          className="bg-white rounded-md shadow-lg max-w-sm lg:max-w-xl w-full overflow-hidden"
        >
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
            <h3 className="text-lg text-gray-600">Assign to "{folder.name}"</h3>
            <CircleButton title={"Close modal"} icon={<IoClose />} onClick={handleCloseModal} />
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="flex gap-1">
              <div className="w-full">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-900"
                    placeholder=" "
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
                    Add faculty
                  </label>
                </div>
              </div>
              {/* <DropdownButton
                buttonText={selectedRole}
                options={common.roleOptions}
                onSelect={onSelectRole}
              /> */}
            </div>
            {/* Render search results */}
            <div>
              {email.trim() !== "" &&
                allUsers
                  .filter((user) => {
                    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
                    const searchValue = email.toLowerCase();
                    for (let i = 0; i < searchValue.length; i++) {
                      if (!fullName.includes(searchValue[i])) {
                        return false;
                      }
                    }
                    return true;
                  })
                  .map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 border-gray-200 p-2 rounded-full my-1"
                    >
                      <span className="text-gray-800 mx-2">{`${user.firstname} ${user.lastname}`}</span>
                      <span className="text-gray-500 mx-2 text-xs">{user.email}</span>
                      <CircleButton icon={<AiOutlinePlus />} onClick={() => addPerson(user)} />
                    </div>
                  ))}
            </div>

            {/* Render added people */}
            <div>
              {people.map((person, index) => (
                <div key={index}>
                  <p className="text-gray-400 text-sm my-2">Added people</p>
                  <div className="flex items-center justify-between bg-gray-50 border-gray-200 p-2 rounded-full my-1">
                    <span className="text-gray-800 mx-2">{person.name}</span>
                    <span className="text-gray-500 mx-2 text-xs">{person.email}</span>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-blue-400">{selectedRole}</span>
                      <CircleButton
                        title={"Remove user"}
                        icon={<IoClose />}
                        onClick={() => setPeople(people.filter((_, i) => i !== index))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full">
              <div className="relative w-full min-w-[200px] min-h-10">
                <textarea
                  rows={4}
                  className="resize-none peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-900"
                  placeholder=" "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
                  Message
                </label>
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="flex items-center justify-end p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
            {/* <CopyLinkButton /> */}
            <OvalButton text={"Done"} onClick={assignPersonToFolder} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FolderTagModal;
