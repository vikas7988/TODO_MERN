# MERN To-Do List Application with User Authentication

This is a simple MERN stack application that allows users to create, read, update, and delete (CRUD) items in a to-do list. The application includes user authentication using JSON Web Tokens (JWT) saved in cookies

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Features

- User registration and login
- Create, read, update, and delete to-do items
- JWT-based authentication to secure the to-do list
- Responsive design

## Technologies

- **Frontend:** React, Redux, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **State Management:** Redux

## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

- [Node.js](v14 or higher)
- [MongoDB](locally installed or use a cloud provider)

step 4:  Clone the Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app

step 2: Navigate to the backend folder:
cd backend


step 3: Install the required dependencies:
npm install

step 4: Create a .env file in the backend folder for your environment variables (optional):
JWT_SECRET=jwtsecretkey

step 5: Start the MongoDB server (if using locally):
mongod

step 6: Run the backend server:
npm run dev


Set Up the Frontend

step 1: Navigate to the frontend folder:
/frontend

step 1: Install the required dependencies:
npm install


step 1: Start the React development server:
npm start

