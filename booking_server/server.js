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

const mongo_url =
"mongodb+srv://dotrixxmaster_db_user:VLuOYQzkwry7gnZv@cluster0.lqvu2as.mongodb.net/ticketdb";

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

app.listen(
    8080,
    () => {

        console.log(
            "Server Running"
        );

    }
);