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

      <Navbar />

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

        path="/book"

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

    </BrowserRouter>

  );

}

export default App;