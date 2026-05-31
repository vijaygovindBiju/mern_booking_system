import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const EventList = () => {

    const [events,setEvents] = useState([]);

    const fetchEvents = async() => {

        try{

            const response =
            await axios.get(
                `${process.env.REACT_APP_API_URL}/events`
            );

            setEvents(response.data);

        }

        catch(error){

            console.log(error);

        }

    };

    useEffect(()=>{

        fetchEvents();

    },[]);

    return(

        <div>

            <h1>Events</h1>

            {
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