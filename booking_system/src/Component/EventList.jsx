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

            <header className="page-header">
                <h1 className="page-title">Available Events</h1>
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
                                    height: '140px', 
                                    background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
                                    borderRadius: '12px',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '32px'
                                }}>
                                    🎬
                                </div>

                                <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>
                                    {event.event_name}
                                </h3>

                                <p style={{ 
                                    color: 'var(--text-secondary)', 
                                    fontSize: '14px',
                                    marginBottom: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <span style={{ color: 'var(--success)' }}>●</span> 15 Seats Available
                                </p>
                                
                                <Link to={`/book/${event.event_id}`} style={{ display: 'block' }}>
                                    <button className="btn-primary" style={{ width: '100%' }}>
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