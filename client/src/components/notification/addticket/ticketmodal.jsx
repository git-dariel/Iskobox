import React from "react";
import Modal from "react-modal";
import TicketForm from "./ticket";
import { Toaster } from "sonner";
import { IoTicketOutline } from "react-icons/io5";

Modal.setAppElement("#root");

const TicketModal = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

 
  return (
 
    <div className="border-2 rounded-full h-auto bg-white hover:bg-blue-700 p-1 pt-1 ">
    <Toaster position="bottom-right" />
   
    <button className="w-4 h-4 rounded-full flex justify-center items-center " onClick={openModal} title="Send Ticket" ><IoTicketOutline /></button>
    {modalIsOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <TicketForm closeModal={closeModal} /> {/* Ipasa ang closeModal function bilang prop */}
        </div>
      </div>
    )}
  </div>

  );
};

export default TicketModal;
