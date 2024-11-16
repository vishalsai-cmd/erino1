Setup Instructions:

1) firstly clone the project to into your system
2) then, install dependencies like mongoose,cors,express in the server side
3) for client side, axios and react-router-dom are to be installed.
4) run npm start in your vs code terminal.


Description:

The purpose of the app is to allow users to manage their contacts, enabling them to add, view, edit, and delete contact information. 

Users can create new contact entries by filling out a form with the contact's details such as name, email, phone number, company, and notes.

The list of existing contacts is displayed in a grid format, showing basic details like name, email, and phone number.

Users can edit the details of an existing contact. The data is fetched from the backend and pre-filled in an edit form, where it can be updated and saved.

Users can delete a contact by confirming the action through a prompt, and the contact will be removed from the database and the frontend UI.

Technical Discussion:

1)Frontend:

frontend has been built with react. it contains multiple components like Contacts, AddContact, EditContact, and Navbar.

2)Backend:

The backend exposes a set of RESTful API routes (GET, POST, PUT, DELETE) to manage the contact data.
Data is fetched from and saved to a MongoDB database using Mongoose.


Challenges faced:
 
Deleting a contact required careful error handling to ensure that the user was warned before performing the action, and after the contact was deleted, the UI needed to reflect the updated state. Initially, the contact list didn’t update instantly after a deletion, or sometimes the wrong contact was deleted due to improper state management.

To tackle this, I ensured that after every deletion, the API would return a success message and then trigger a re-fetch of the contact list. I used window.confirm() to prompt the user before deleting a contact and implemented the logic to refresh the data immediately upon successful deletion.
