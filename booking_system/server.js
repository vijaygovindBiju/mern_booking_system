require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {
    createEvent,
    getEvents
} = require("./controllers/eventController");

const {
    createBooking,
    getBookings
} = require("./controllers/bookingController");

const app = express();

app.use(express.json());
app.use(cors());

const mongo_url = process.env.MONGODB_URI;

mongoose.connect(mongo_url)

.then(() => {

    console.log(
        "MongoDB Connected"
    );

})

.catch((error) => {

    console.log(error);

});

app.post(
    "/event",
    createEvent
);

app.get(
    "/events",
    getEvents
);

app.post(
    "/book",
    createBooking
);

app.get(
    "/bookings",
    getBookings
);

const PORT = process.env.PORT || 8080;
app.listen(
    PORT,
    () => {

        console.log(
            `Server Running on port ${PORT}`
        );

    }
);