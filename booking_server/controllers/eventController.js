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

        res.send(error);

    });

};

const getEvents = (req,res)=>{

    Event.find()

    .then((data)=>{

        res.json(data);

    })

    .catch((error)=>{

        res.send(error);

    });

};

module.exports = {
    createEvent,
    getEvents
};