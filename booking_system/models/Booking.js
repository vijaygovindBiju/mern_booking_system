const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    booking_id:{
        type:Number,
        required:true
    },

    user_name:{
        type:String,
        required:true
    },

    event_id:{
        type:Number,
        required:true
    },

    seat_number:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model(
    "booking",
    bookingSchema
);