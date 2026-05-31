import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const EventList = () => {

    const [events,setEvents] = useState([]);

    const fetchEvents = async() => {

        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

        try{

            const response =
            await axios.get(
                `${API_URL}/events`
            );

            setEvents(response.data);

        }

        catch(error){

            console.error("Failed to fetch events:", error);

        }

    };

    useEffect(()=>{

        fetchEvents();

    },[]);

    return(

        <div>

            <h1>Events</h1>

            {events.length === 0 ? <p>No events found. Go to Admin to add one!</p> :
                events.map((event)=>{

                    return(

                        <div
                        key={event.event_id}
                        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
                        >

                            <h3>
                                {event.event_name}
                            </h3>
                            
                            <Link to={`/book/${event.event_id}`}>
                                <button>Book Now</button>
                            </Link>

                        </div>

                    );

                })
            }

        </div>

    );

};