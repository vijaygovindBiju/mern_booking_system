require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {
    createEvent,
    getEvents,
    deleteEvent
} = require("./controllers/eventController");

const {
    createBooking,
    getBookings
} = require("./controllers/bookingController");

const {
    signup,
    login
} = require("./controllers/userController");

const app = express();

app.use(express.json());
app.use(cors());

// Debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

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

app.delete(
    "/event/:id",
    deleteEvent
);

app.post(
    "/book",
    createBooking
);

app.get(
    "/bookings",
    getBookings
);

app.get("/test", (req, res) => res.send("test ok"));

app.post(
    "/signup",
    signup
);

app.post(
    "/login",
    login
);

const PORT = process.env.PORT || 8081;
app.listen(
    PORT,
    () => {

        console.log(
            `Server Running on port ${PORT}`
        );

    }
);