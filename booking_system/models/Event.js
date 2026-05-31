const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    event_id:{
        type:Number,
        required:true
    },

    event_name:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model(
    "event",
    eventSchema
);