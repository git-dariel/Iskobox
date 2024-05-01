// ticket.jsx

import { addNewNotification } from '@/services/notification/notif.service';
import React, { useState } from 'react';

const TicketForm = ({ addTicketToNotifications }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewNotification(formData); // Add new notification to the database
      setFormData({ title: '', description: '' });
      console.log('Ticket successfully added to the database');
      if (typeof addTicketToNotifications === 'function') {
        addTicketToNotifications(formData);
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='h-40 w-50'>
      <form className='flex flex-col items-left justify-center ' onSubmit={handleSubmit}>
        <input className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;