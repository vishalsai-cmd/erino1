import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditContact.css';

function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/contacts/${id}`);
      setContact(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Contact not found.');
        navigate('/');
      } else {
        console.error('Error fetching contact:', error);
      }
    }
  };
  

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/contacts/${id}`, contact);
      navigate('/');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={contact.company}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Notes</label>
          <textarea
            name="notes"
            value={contact.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Contact
        </button>
      </form>
    </div>
  );
}

export default EditContact;