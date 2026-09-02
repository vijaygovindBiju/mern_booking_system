# MERN Booking System

A full-stack event booking application built with **MongoDB, Express, React, and Node.js**, featuring event management, interactive seat selection, and booking management.

## Overview

This project demonstrates a complete client-server application with a React frontend, Express/Node.js backend, and MongoDB persistence layer.

## Features

- Event creation and listing
- Upcoming-event browsing
- Interactive seat selection
- Booking management
- Responsive React interface
- REST-style backend communication
- MongoDB persistence through Mongoose

## Architecture

```text
React Client
    │
    │ HTTP / Axios
    ▼
Express + Node.js API
    │
    │ Mongoose
    ▼
MongoDB
```

The frontend is responsible for presentation and user interaction, while the backend handles application logic, API endpoints, and database access.

## Tech Stack

- **Frontend:** React 19, Axios, React Router DOM, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Configuration:** dotenv
- **Development:** concurrently, CORS

## Project Structure

```text
mern_booking_system/
└── booking_system/
    ├── controllers/       # Backend application logic
    ├── models/            # Mongoose schemas
    ├── src/               # React frontend
    │   ├── Component/     # UI components
    │   └── App.js         # Frontend entry component
    ├── server.js          # Backend entry point
    └── package.json       # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB locally or through MongoDB Atlas

### Installation

```bash
git clone https://github.com/vijaygovindBiju/mern_booking_system.git
cd mern_booking_system/booking_system
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Configure the MongoDB connection and other required values in `.env`.

### Run in development

```bash
npm run dev
```

The development scripts start the backend and React client together.

### Other commands

```bash
npm start       # Backend only
npm run client  # Frontend only
npm run build   # Production frontend build
```

## Engineering Focus

This project was built to practice full-stack application development, including frontend routing, API communication, server-side application logic, database modeling, and environment-based configuration.

## Future Improvements

- Authentication and authorization
- Stronger server-side validation
- Payment integration
- Booking cancellation and refund flows
- Improved seat-locking/concurrency handling
- Automated tests

## License

Educational and portfolio project.
