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

        <div>

            <header className="page-header">
                <h1 className="page-title">Admin Dashboard</h1>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-value">
                        <span style={{ fontSize: '24px' }}>📅</span> 03
                    </span>
                    <span className="stat-label">Total Events</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        <span style={{ fontSize: '24px' }}>🎫</span> 12
                    </span>
                    <span className="stat-label">Total Bookings</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        <span style={{ fontSize: '24px' }}>💺</span> 45
                    </span>
                    <span className="stat-label">Available Seats</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 700px) 1fr', gap: '32px', alignItems: 'start' }}>
                
                <div className="card">
                    <h2 style={{ fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>✨</span> Create New Event
                    </h2>

                    <div className="input-group">
                        <label className="input-label">Event Name</label>
                        <input
                            className="input-field"
                            value={event}
                            onChange={(e)=>setEvent(e.target.value)}
                            placeholder="e.g. Marvel Movie Marathon"
                        />
                    </div>

                    <button 
                        className="btn-primary" 
                        onClick={addEventHandler}
                        style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '16px' }}
                    >
                        Publish Event
                    </button>
                </div>

                <div className="card">
                    <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Recent Events</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['Avengers: Endgame', 'Tech Conference 2026', 'Music Fest'].map((e, i) => (
                            <div key={i} style={{ 
                                padding: '12px', 
                                background: '#F8FAFC', 
                                borderRadius: '8px', 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '14px', fontWeight: '500' }}>{e}</span>
                                <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: '700' }}>ACTIVE</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>

    );

};