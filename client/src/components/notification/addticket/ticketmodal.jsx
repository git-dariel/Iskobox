import React from "react";
import Modal from "react-modal";
import TicketForm from "./ticket";

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
      <button onClick={openModal}>Request Ticket</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-20"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <TicketForm closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default TicketModal;
