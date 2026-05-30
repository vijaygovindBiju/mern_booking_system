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

        res.send(error);

    }

};

const getBookings = (req,res)=>{

    Booking.find()

    .then((data)=>{

        res.json(data);

    })

    .catch((error)=>{

        res.send(error);

    });

};

module.exports = {

    createBooking,

    getBookings

};