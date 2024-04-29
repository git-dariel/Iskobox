import React, { useState } from 'react';
import { addNewNotification } from '@/services/notification/notif.service';

const TicketForm = ({ addTicketToNotifications }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // Add more fields as needed
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add ticket to database
      await addNewNotification(formData);
      // Reset form after submission
      setFormData({
        title: '',
        description: '',
        // Add more fields as needed
      });
      console.log('Ticket successfully added to the database');
      addTicketToNotifications(formData); // I-set ang huling ticket na idinagdag
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name='description'
        placeholder='Description'
        value={formData.description}
        onChange={handleChange}
      />
      {/* Add more input fields here */}
      <button type='submit'>Submit Ticket</button>
    </form>
  );
};

export default TicketForm;
