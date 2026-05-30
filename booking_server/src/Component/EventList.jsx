import { useEffect, useState } from "react";
import axios from "axios";

export const EventList = () => {

    const [events,setEvents] = useState([]);

    const fetchEvents = async() => {

        try{

            const response =
            await axios.get(
                "http://localhost:8080/events"
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
                        >

                            <h3>
                                {event.event_name}
                            </h3>

                        </div>

                    );

                })
            }

        </div>

    );

};