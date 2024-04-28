// NotificationBellForm.js

import React, { useState, useEffect } from "react";
import { fetchNotifications } from "@/services/notification/notif.service";

const NotificationBellForm = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTicketsFromServer();
  }, []);

  const fetchTicketsFromServer = async () => {
    const tickets = await fetchNotifications(); 
    setTickets(tickets);
  };

  return (
    <div className="relative">
      <div>
        <h2>Notifications:</h2>
        <ul>
          {tickets &&
            tickets.map((ticket) => (
              <li key={ticket.id}>
                New Ticket: {ticket.title} - {ticket.description}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationBellForm;
