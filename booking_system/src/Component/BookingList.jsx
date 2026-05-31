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
                <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                    <h2 style={{ marginBottom: '8px' }}>No Bookings Yet</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>You haven't made any bookings. Go to the Events page to find something exciting!</p>
                </div> 
                :
                <div className="card-grid">
                    {bookings.map((booking)=>{

                        return(

                            <div key={booking.booking_id} className="card">
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <div style={{ 
                                        width: '44px', 
                                        height: '44px', 
                                        borderRadius: '12px', 
                                        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', 
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '700',
                                        fontSize: '18px'
                                    }}>
                                        {booking.user_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '16px' }}>{booking.user_name}</h3>
                                        <span className="badge badge-success" style={{ fontSize: '10px' }}>Confirmed</span>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                        Booking ID: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>#BK{booking.booking_id.toString().slice(-4)}</span>
                                    </p>

                                    <p style={{ fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '16px' }}>🎬</span>
                                        <strong style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Event:</strong> 
                                        <span style={{ fontWeight: '600' }}>{getEventName(booking.event_id)}</span>
                                    </p>

                                    <p style={{ fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '16px' }}>💺</span>
                                        <strong style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Seat:</strong>
                                        <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{booking.seat_number}</span>
                                    </p>

                                    <div style={{ 
                                        marginTop: '16px', 
                                        padding: '8px 12px', 
                                        background: '#F8FAFC', 
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        color: 'var(--text-secondary)',
                                        textAlign: 'center'
                                    }}>
                                        🗓 Booked On: 12 June 2026
                                    </div>
                                </div>

                            </div>

                        );

                    })}
                </div>
            }

        </div>

    );

};