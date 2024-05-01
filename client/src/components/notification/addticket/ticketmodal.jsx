import React from "react";
import Modal from "react-modal";
import TicketForm from "./ticket";

// Tukuyin ang main app element (div with id 'root' sa karamihan ng React applications)
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
    <div className="border-2 rounded-xl p-5 bg-white hover:bg-blue-900 ">
      <button onClick={openModal}>Open Ticket Form</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById("root")}
      >
        <TicketForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default TicketModal;
