import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddEvent = ()=>{

    const navigate = useNavigate();

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

                `${process.env.REACT_APP_API_URL}/event`,

                body

            );

            alert("Event Added");

            setEvent("");
            
            navigate("/");

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