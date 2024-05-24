import { addNewNotification } from "@/services/notification/notif.service";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

function getNextId() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString().slice(-2);
  const sequenceNumber = "00";
  return `${day}${month}${year}-${sequenceNumber}`;
}

toast("My toast", {
  duration: 5000,
});

const TicketForm = ({ addTicketToNotifications, closeModal }) => {
  const [formData, setFormData] = useState({
    id: getNextId(),
    title: "",
    description: "",
  });

  const submitButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      const currentTime = now.toLocaleTimeString(); // Get current time in HH:MM:SS format
      const ticketData = { ...formData, date: currentDate, time: currentTime }; // Include date and time in ticket data

      await addNewNotification(ticketData);
      console.log("About to show toast");
      toast.success("Ticket has been submitted"); // Success toast

      closeModal();
      setFormData({ id: getNextId(), title: "", description: "" });

      if (typeof addTicketToNotifications === "function") {
        addTicketToNotifications(ticketData);
      }
      submitButtonRef.current?.focus();
    } catch (error) {
      console.error("Error adding ticket:", error);
      toast.error("Error submitting ticket."); // Error toast
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className=" flex items-center justify-center select-none">
      <div className="bg-white rounded-md   max-w-sm lg:max-w-xl w-full overflow-hidden">
        <div className="flex justify-between px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create Request Ticket
          </h3>
        </div>

        <form className="" onSubmit={handleSubmit}>
          <div className="px-4 py-5 space-y-6 sm:p-6">
            <div className="relative  min-w-[200px] h-auto">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-900"
                type="label"
                name="title"
                placeholder="  "
                value={formData.title}
                onChange={handleChange}
                required
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
                Title
              </label>
            </div>

            <div className="relative w-full min-w-[200px] h-auto">
            <textarea
              // className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-900"
              name="description"
              placeholder=" "
              value={formData.description}
              onChange={handleChange}
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
              Reason
            </label>
            </div>
          

          <div className="flex flex-row-reverse gap-5">
            <button
              ref={submitButtonRef}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-2xl"
              type="submit"
            >
              Submit
            </button>

          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
