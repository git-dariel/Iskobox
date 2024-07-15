import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import OvalButton from "../common/buttons/reusable/oval.button";
import CircleButton from "../common/buttons/reusable/circle.button";
import { IoAdd } from "react-icons/io5";

const FileTagModal = ({ onClose, fileName }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    onClose();
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out z-[9999]">
        <div
          ref={modalRef}
          className="bg-white rounded-md shadow-lg max-w-sm lg:max-w-xl w-full overflow-hidden"
        >
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
            <h3 className="text-lg text-gray-600">Add tags to "{fileName}"</h3>
            <CircleButton
              title={"Close modal"}
              icon={<IoClose />}
              onClick={handleCloseModal}
            />
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="flex gap-1">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Enter a tag and press Enter"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1"
                >
                  <span className="text-gray-700"># {tag}</span>
                  <CircleButton
                    title={"Remove tag"}
                    icon={<IoClose size={14} />}
                    onClick={() => handleRemoveTag(index)}
                    className="m-2"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Modal footer */}
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
            <OvalButton text={"Done"} onClick={handleCloseModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FileTagModal;
