import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddEvent = ()=>{

    const navigate = useNavigate();

    const [event,setEvent] =
    useState("");

    const addEventHandler =
    async()=>{

        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

        try{

            const body = {

                event_id:Date.now(),

                event_name:event

            };

            await axios.post(

                `${API_URL}/event`,

                body

            );

            alert("Event Added");

            setEvent("");
            
            navigate("/");

        }

        catch(error){

            console.error("Failed to add event:", error);

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