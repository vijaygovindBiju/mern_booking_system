import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const EventList = () => {

    const [events,setEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchEvents = async() => {

        const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8081";

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
                <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎟</div>
                    <h2 style={{ marginBottom: '8px' }}>No Events Available</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Create your first event from the Admin Dashboard to get started.</p>
                </div> 
                :
                <div className="card-grid">
                    {events.map((event)=>{

                        return(

                            <div key={event.event_id} className="card" style={{ padding: '0', overflow: 'hidden' }}>

                                <div style={{ 
                                    height: '140px', 
                                    background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '32px',
                                    position: 'relative'
                                }}>
                                    🎬
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '12px', 
                                        right: '12px',
                                        background: 'rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(4px)',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        color: 'white'
                                    }}>
                                        PREMIUM
                                    </div>
                                </div>

                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>
                                        {event.event_name}
                                    </h3>

                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '16px' }}>📅</span> 25 June 2026
                                        </p>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '16px' }}>📍</span> Kochi, Kerala
                                        </p>
                                        <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '16px' }}>🎟</span> 15 Seats Available
                                        </p>
                                    </div>
                                    
                                    {(!user || user.role === "user") && (
                                        <Link to={`/book/${event.event_id}`} style={{ display: 'block' }}>
                                            <button className="btn-primary" style={{ width: '100%', borderRadius: '12px' }}>
                                                Book Ticket
                                            </button>
                                        </Link>
                                    )}
                                    
                                    {user && user.role === "admin" && (
                                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', fontStyle: 'italic' }}>
                                            View only mode
                                        </div>
                                    )}
                                </div>

                            </div>

                        );

                    })}
                </div>
            }

        </div>

    );

};