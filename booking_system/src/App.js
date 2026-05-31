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

function App() {

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
            <div className="user-profile">
              <span style={{ cursor: 'pointer' }}>☀️</span>
              <span style={{ color: 'var(--border)' }}>|</span>
              <span style={{ cursor: 'pointer' }}>🔔</span>
              <div style={{ width: 32, height: 32, background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}>👤</div>
              <span>Vijay</span>
            </div>
          </div>

          <Routes>

            <Route

            path="/"

            element={
            <EventList />
            }

            />

            <Route

            path="/admin"

            element={
            <AddEvent />
            }

            />

            <Route

            path="/book/:event_id"

            element={
            <SeatBooking />
            }

            />

            <Route

            path="/bookings"

            element={
            <BookingList />
            }

            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  );

}

export default App;