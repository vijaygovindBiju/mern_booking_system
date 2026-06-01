import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AddEvent = ()=>{

    const [event,setEvent] = useState("");
    const [eventsList, setEventsList] = useState([]);
    const [bookingsCount, setBookingsCount] = useState(0);

    const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8081";

    const fetchData = useCallback(async () => {
        try {
            const eventsRes = await axios.get(`${API_URL}/events`);
            setEventsList(eventsRes.data);
            
            const bookingsRes = await axios.get(`${API_URL}/bookings`);
            setBookingsCount(bookingsRes.data.length);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addEventHandler =
    async()=>{

        if(!event) return alert("Please enter an event name");

        try{

            const body = {
                event_id:Date.now(),
                event_name:event
            };

            await axios.post(`${API_URL}/event`, body);

            alert("Event Added");
            setEvent("");
            fetchData(); // Refresh the list
        }

        catch(error){
            console.error("Failed to add event:", error);
        }

    };

    const deleteEventHandler = async (id) => {
        if(window.confirm("Are you sure you want to delete this event?")) {
            try {
                await axios.delete(`${API_URL}/event/${id}`);
                alert("Event Deleted Successfully");
                fetchData(); // Refresh the list
            } catch (error) {
                console.error("Failed to delete event:", error);
                alert("Failed to delete event. Please check the console for details.");
            }
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
                        <span style={{ fontSize: '24px' }}>📅</span> {String(eventsList.length).padStart(2, '0')}
                    </span>
                    <span className="stat-label">Total Events</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        <span style={{ fontSize: '24px' }}>🎫</span> {String(bookingsCount).padStart(2, '0')}
                    </span>
                    <span className="stat-label">Total Bookings</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        <span style={{ fontSize: '24px' }}>💺</span> {String(eventsList.length * 15).padStart(2, '0')}
                    </span>
                    <span className="stat-label">Total Seats</span>
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
                        {eventsList.length === 0 ? (
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>No events yet.</p>
                        ) : (
                            eventsList.slice(0, 5).reverse().map((e) => (
                                <div key={e.event_id} style={{ 
                                    padding: '12px', 
                                    background: '#F8FAFC', 
                                    borderRadius: '8px', 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: '1px solid var(--border)'
                                }}>
                                    <div>
                                        <span style={{ fontSize: '14px', fontWeight: '500', display: 'block' }}>{e.event_name}</span>
                                        <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: '700' }}>ACTIVE</span>
                                    </div>
                                    <button 
                                        onClick={() => deleteEventHandler(e._id)}
                                        style={{ 
                                            background: '#FEE2E2', 
                                            color: '#EF4444', 
                                            padding: '6px 10px', 
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

        </div>

    );

};