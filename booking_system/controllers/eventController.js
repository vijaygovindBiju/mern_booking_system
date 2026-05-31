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

const deleteEvent = (req, res) => {
    const id = req.params.id;
    console.log("Attempting to delete event with Mongo ID:", id);
    
    Event.findByIdAndDelete(id)
    .then((result) => {
        if (!result) {
            console.warn("No event found with Mongo ID:", id);
            return res.status(404).send("Event not found");
        }
        console.log("Event deleted successfully");
        res.send("Event Deleted Successfully");
    })
    .catch((error) => {
        console.error("Delete Error:", error);
        res.status(500).send("Error deleting event");
    });
};

module.exports = {
    createEvent,
    getEvents,
    deleteEvent
};