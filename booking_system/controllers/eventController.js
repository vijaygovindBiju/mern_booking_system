const Event = require("../models/Event");

const createEvent = (req,res)=>{

    Event.create({

        event_id:req.body.event_id,

        event_name:req.body.event_name

    })

    .then(()=>{

        res.send("Event Created");

    })

    .catch((error)=>{

        console.error("Database Error:", error);
        res.status(500).send("Database Error. Please check your connection.");

    });

};

const getEvents = (req,res)=>{

    Event.find()

    .then((data)=>{

        res.json(data);

    })

    .catch((error)=>{

        console.error("Database Error:", error);
        res.status(500).send("Database Error. Please check your connection.");

    });

};

module.exports = {
    createEvent,
    getEvents
};