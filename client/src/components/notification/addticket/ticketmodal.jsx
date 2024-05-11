import React from "react";
import Modal from "react-modal";
import TicketForm from "./ticket";
import { Toaster } from "sonner";


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

    <div className="border-2 rounded-xl bg-white hover:bg-blue-700 p-2 ">
    <Toaster position="bottom-right" />
    <button onClick={openModal}>Request Ticket</button>
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
