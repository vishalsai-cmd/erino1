import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;