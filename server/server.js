const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://vishalsair2005:sai123@cluster0.c7dix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));


const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);


app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    notes: req.body.notes,
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    Object.assign(contact, req.body);
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    console.log('Delete request received for ID:', req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.error('Invalid ID format');
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      console.error('Contact not found');
      return res.status(404).json({ message: 'Contact not found' });
    }

    console.log('Contact deleted successfully');
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).json({ message: error.message });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
