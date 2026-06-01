import './App.css';

import { BrowserRouter }
from "react-router-dom";

import {
Routes,
Route
}
from "react-router-dom";

import { Navbar }
from "./Component/Navbar";

import { EventList }
from "./Component/EventList";

import { AddEvent }
from "./Component/AddEvent";

import { SeatBooking }
from "./Component/SeatBooking";

import { BookingList }
from "./Component/BookingList";

import { Login }
from "./Component/Login";

import { Signup }
from "./Component/Signup";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <BrowserRouter>

      <div className="app-container">

        <Navbar />

        <main className="main-content">

          <div className="top-bar">
            <div className="search-container">
              <span style={{ position: 'absolute', left: '14px', top: '10px', color: 'var(--text-secondary)' }}>🔍</span>
              <input type="text" className="search-input" placeholder="Search events, bookings..." />
            </div>
          </div>

          <Routes>

            <Route
            path="/login"
            element={<Login />}
            />

            <Route
            path="/signup"
            element={<Signup />}
            />

            <Route

            path="/"

            element={
            <EventList />
            }

            />

            <Route

            path="/admin"

            element={
              user && user.role === "admin" ? <AddEvent /> : <Login />
            }

            />

            <Route

            path="/book/:event_id"

            element={
              user && user.role === "user" ? <SeatBooking /> : <Login />
            }

            />

            <Route

            path="/bookings"

            element={
              user ? <BookingList /> : <Login />
            }

            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  );

}

export default App;