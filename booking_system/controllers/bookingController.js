const Booking = require("../models/Booking");

const createBooking = async(req,res)=>{

    try{

        const existingSeat =
        await Booking.findOne({

            event_id:req.body.event_id,

            seat_number:req.body.seat_number

        });

        if(existingSeat){

            return res.send(
                "Seat Already Booked"
            );

        }

        await Booking.create({

            booking_id:req.body.booking_id,

            user_name:req.body.user_name,

            event_id:req.body.event_id,

            seat_number:req.body.seat_number

        });

        res.send(
            "Booking Successful"
        );

    }

    catch(error){

        console.error("Booking Error:", error);
        res.status(500).send("Internal Server Error during booking.");

    }

};

const getBookings = (req,res)=>{

    Booking.find()

    .then((data)=>{

        res.json(data);

    })

    .catch((error)=>{

        console.error("Fetch Bookings Error:", error);
        res.status(500).send("Could not fetch bookings.");

    });

};

module.exports = {

    createBooking,

    getBookings

};