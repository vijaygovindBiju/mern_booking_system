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

            <div className="hero-section">
                <h1 className="hero-title">🎟 Welcome Back</h1>
                <p className="hero-subtitle">Browse and book upcoming premium events near you.</p>
            </div>

            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="page-title">Upcoming Events</h1>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Showing {events.length} events</div>
            </header>

            {events.length === 0 ? 
                <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No events found. Go to Admin to add one!</p>
                </div> 
                :
                <div className="card-grid">
                    {events.map((event)=>{

                        return(

                            <div key={event.event_id} className="card">

                                <div style={{ 
                                    height: '160px', 
                                    background: `linear-gradient(${Math.random() * 360}deg, #6366F1 0%, #A855F7 100%)`,
                                    borderRadius: '16px',
                                    marginBottom: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '40px',
                                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                                }}>
                                    ✨
                                </div>

                                <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>
                                    {event.event_name}
                                </h3>

                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span>📅</span> 25 June 2026
                                    </p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span>📍</span> Kochi, Kerala
                                    </p>
                                    <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span>🎟</span> 15 Seats Available
                                    </p>
                                </div>
                                
                                <Link to={`/book/${event.event_id}`} style={{ display: 'block' }}>
                                    <button className="btn-primary" style={{ width: '100%', borderRadius: '12px' }}>
                                        Book Ticket
                                    </button>
                                </Link>

                            </div>

                        );

                    })}
                </div>
            }

        </div>

    );

};