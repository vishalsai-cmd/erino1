Setup Instructions:

1) firstly clone the project to into your system
2) then, install dependencies like mongoose,cors,express in the server side
3) for client side, axios and react-router-dom are to be installed.
4) run npm start in your vs code terminal.


Description:

 this application allows users to manage their contacts by adding, viewing, editing, and deleting contact information. The app stores data in MongoDB and provides a RESTful API built with Express.js for backend communication. 
 The frontend is built with React and allows users to interact with the system.

 Challenges faced
 
 issue was dealing with asynchronous data fetching when loading contacts. Since data from the backend API is fetched asynchronously, rendering the contacts before they were fully fetched led to errors or empty UI states. Initially, the page would render without the contact data, leaving users confused about the content not showing up.
