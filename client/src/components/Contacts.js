import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Contacts.css'; 

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white p-4 rounded shadow">
            <div className="contact-info">
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              <p className="text-gray-600">{contact.email}</p>
              <p className="text-gray-600">{contact.phone}</p>
              {contact.company && <p className="text-gray-600">{contact.company}</p>}
            </div>
            <div className="button-container">
              <Link
                to={`/edit/${contact._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteContact(contact._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
