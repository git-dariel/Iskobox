import { addNewNotification } from "@/services/notification/notif.service";
import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getNextId() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0'); 
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
  const year = now.getFullYear().toString().slice(-2);
  const sequenceNumber = "00"; 
  return `${day}${month}${year}-${sequenceNumber}`;
}

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
      await addNewNotification(formData);
      closeModal();
      setFormData({ id: getNextId(), title: "", description: "" });
      console.log("About to show toast");
      toast.success("Ticket successfully submitted!"); // Show success toast
      if (typeof addTicketToNotifications === "function") {
        addTicketToNotifications(formData);
      }
      submitButtonRef.current.focus();
    } catch (error) {
      console.error("Error adding ticket:", error);
      toast.error("Error submitting ticket."); // Show error toast
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-50 w-60">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />
      <form
        className="flex flex-col gap-2 items-left justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="label"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="description"
          placeholder="Reason"
          value={formData.description}
          onChange={handleChange}
        />
        <button
          ref={submitButtonRef}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;