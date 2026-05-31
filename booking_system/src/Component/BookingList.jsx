import { useEffect,useState } from "react";
import axios from "axios";

export const BookingList = ()=>{

    const [bookings,setBookings] =
    useState([]);
    const [events, setEvents] = useState([]);

    const fetchData =
    async()=>{

        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

        try{

            const [bookingsRes, eventsRes] = await Promise.all([
                axios.get(`${API_URL}/bookings`),
                axios.get(`${API_URL}/events`)
            ]);

            setBookings(bookingsRes.data);
            setEvents(eventsRes.data);

        }

        catch(error){

            console.error("Failed to fetch bookings:", error);

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

            <header className="page-header">
                <h1 className="page-title">My Bookings</h1>
            </header>

            {bookings.length === 0 ? 
                <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No bookings yet. Go book a ticket!</p>
                </div> 
                :
                <div className="card-grid">
                    {bookings.map((booking)=>{

                        return(

                            <div key={booking.booking_id} className="card">
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%', 
                                        background: '#EEF2FF', 
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '700'
                                    }}>
                                        {booking.user_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '16px' }}>{booking.user_name}</h3>
                                        <span className="badge badge-success">Confirmed</span>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                                        <strong style={{ color: 'var(--text-secondary)' }}>Event:</strong> 
                                        <span style={{ marginLeft: '8px' }}>{getEventName(booking.event_id)}</span>
                                    </p>

                                    <p style={{ fontSize: '14px' }}>
                                        <strong style={{ color: 'var(--text-secondary)' }}>Seat:</strong>
                                        <span style={{ marginLeft: '12px', fontWeight: '600', color: 'var(--primary)' }}>{booking.seat_number}</span>
                                    </p>
                                </div>

                            </div>

                        );

                    })}
                </div>
            }

        </div>

    );

};