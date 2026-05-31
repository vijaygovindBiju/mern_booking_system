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

        <div style={{ maxWidth: '600px' }}>

            <header className="page-header">
                <h1 className="page-title">Admin Dashboard</h1>
            </header>

            <div className="card">
                
                <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Add New Event</h2>

                <div className="input-group">
                    <label className="input-label">Event Name</label>
                    <input
                        className="input-field"
                        value={event}
                        onChange={(e)=>setEvent(e.target.value)}
                        placeholder="e.g. Summer Music Festival"
                    />
                </div>

                <button 
                    className="btn-primary" 
                    onClick={addEventHandler}
                    style={{ width: '100%', padding: '14px' }}
                >
                    Create Event
                </button>

            </div>

        </div>

    );

};