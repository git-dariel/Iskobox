import { createFirestoreFunctionsForCollection } from '../template.service';

const ticketOperations = createFirestoreFunctionsForCollection('tickets');

// Fetch Tickets
export const fetchTickets = async () => {
  const tickets = await ticketOperations.fetchDocuments();
  console.log(tickets);
};

// Add Ticket
export const addNewTicket = async (newTicketData) => {
  const newTicket = await ticketOperations.addDocument(newTicketData);
  console.log(newTicket);
};

// Update Ticket
export const updateTicket = async (ticketId, newValue) => {
  const updatedTicket = await ticketOperations.updateDocument(ticketId, newValue);
  console.log(updatedTicket);
};

// Delete Ticket
export const deleteTicket = async (ticketId) => {
  await ticketOperations.deleteDocument(ticketId);
};
