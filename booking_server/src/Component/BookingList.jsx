import { useEffect,useState } from "react";
import axios from "axios";

export const BookingList = ()=>{

    const [bookings,setBookings] =
    useState([]);
    const [events, setEvents] = useState([]);

    const fetchData =
    async()=>{

        try{

            const [bookingsRes, eventsRes] = await Promise.all([
                axios.get(`${process.env.REACT_APP_API_URL}/bookings`),
                axios.get(`${process.env.REACT_APP_API_URL}/events`)
            ]);

            setBookings(bookingsRes.data);
            setEvents(eventsRes.data);

        }

        catch(error){

            console.log(error);

        }

    };

    useEffect(()=>{

        fetchData();

    },[]);

    const getEventName = (eventId) => {
        const event = events.find(e => String(e.event_id) === String(eventId));
        return event ? event.event_name : "Unknown Event";
    };

    return(

        <div>

            <h1>Bookings</h1>

            {

                bookings.map((booking)=>{

                    return(

                        <div

                        key={
                        booking.booking_id
                        }
                        style={{ borderBottom: "1px solid #eee", padding: "10px" }}
                        >

                            <h3>

                                {
                                booking.user_name
                                }

                            </h3>

                            <p>
                                <strong>Event:</strong> {getEventName(booking.event_id)}
                            </p>

                            <p>

                                Seat :

                                {
                                booking.seat_number
                                }

                            </p>

                        </div>

                    );

                })

            }

        </div>

    );

};