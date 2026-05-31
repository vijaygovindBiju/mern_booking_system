import { useState } from "react";
import axios from "axios";

export const AddEvent = ()=>{

    const [event,setEvent] =
    useState("");

    const addEventHandler =
    async()=>{

        try{

            const body = {

                event_id:Date.now(),

                event_name:event

            };

            await axios.post(

                "http://localhost:8080/event",

                body

            );

            alert("Event Added");

            setEvent("");

        }

        catch(error){

            console.log(error);

        }

    };

    return(

        <div>

            <h1>Add Event</h1>

            <input

                value={event}

                onChange={(e)=>
                setEvent(e.target.value)}

                placeholder="Event Name"

            />

            <button
            onClick={addEventHandler}>

                Add Event

            </button>

        </div>

    );

};