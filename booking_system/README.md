# MERN Event Booking System with RBAC

A full-stack Event Booking System built using the MERN stack (MongoDB, Express, React, Node.js) featuring Role-Based Access Control (RBAC).

## 🚀 Features

- **User Authentication**: Secure Signup and Login functionality.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Can create and delete events, and view all bookings across the system.
  - **User**: Can browse events, book seats, and view their personal booking history.
- **Dynamic UI**: Navbar and routes adapt automatically based on the logged-in user's role.
- **Real-time Validation**: Prevents double-booking of the same seat for the same event.
- **Modern UI**: Clean, responsive design with interactive seat selection.

## 🛠 Tech Stack

- **Frontend**: React.js, React Router, Axios, Vanilla CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (via Mongoose).
- **Architecture**: RESTful API.

## 📋 API Endpoints

### Authentication
- `POST /signup`: Create a new user (Role: user/admin).
- `POST /login`: Authenticate user and start session.

### Events
- `GET /events`: Fetch all available events (Public).
- `POST /event`: Create a new event (Admin only).
- `DELETE /event/:id`: Remove an event by ID (Admin only).

### Bookings
- `POST /book`: Reserve a seat for an event (User only).
- `GET /bookings`: Fetch bookings (Filtered for Users, full list for Admins).

## ⚙️ Setup & Installation

1. **Clone the repository**
2. **Backend Configuration**:
   - Navigate to `booking_system/`
   - Create a `.env` file and add your `MONGODB_URI`.
   - The server defaults to port **8081**.
3. **Install Dependencies**:
   ```bash
   cd booking_system
   npm install
   ```
4. **Run the Application**:
   ```bash
   npm run dev
   ```
   - Frontend runs on: `http://localhost:3000`
   - Backend runs on: `http://localhost:8081`

## 🛡 Security Note
This project currently uses plain-text password storage for simplicity and demonstration purposes. For production use, it is highly recommended to implement password hashing (e.g., bcrypt) and token-based authentication (JWT).
