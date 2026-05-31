import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const SeatBooking = () => {
    const { event_id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [seat, setSeat] = useState("");
    const [bookedSeats, setBookedSeats] = useState([]);
    const [eventName, setEventName] = useState("");

    const fetchEventData = useCallback(async () => {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
        try {
            // Fetch events to get the name
            const eventsResponse = await axios.get(`${API_URL}/events`);
            const currentEvent = eventsResponse.data.find(e => String(e.event_id) === String(event_id));
            if (currentEvent) {
                setEventName(currentEvent.event_name);
            } else {
                setEventName("Event Not Found");
            }

            // Fetch bookings for seat availability
            const bookingsResponse = await axios.get(`${API_URL}/bookings`);
            const currentEventBookings = bookingsResponse.data
                .filter(b => String(b.event_id) === String(event_id))
                .map(b => b.seat_number);
            setBookedSeats(currentEventBookings);
        } catch (error) {
            console.error("Error fetching booking data:", error);
        }
    }, [event_id]);

    useEffect(() => {
        fetchEventData();
    }, [fetchEventData]);

    const bookTicket = async () => {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
        try {
            const body = {
                booking_id: Date.now(),
                user_name: name,
                event_id: event_id,
                seat_number: seat
            };

            const response = await axios.post(`${API_URL}/book`, body);
            alert(response.data);

            if (response.data === "Booking Successful") {
                navigate("/bookings");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const seats = [
        "A1", "A2", "A3", "A4", "A5",
        "B1", "B2", "B3", "B4", "B5",
        "C1", "C2", "C3", "C4", "C5"
    ];

    if (!event_id) {
        return (
            <div className="card" style={{ padding: "48px", textAlign: "center", maxWidth: '500px', margin: '40px auto' }}>
                <h2 style={{ marginBottom: '16px' }}>No Event Selected</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Please go back to the home page and select an event to book.</p>
                <button className="btn-primary" onClick={() => navigate("/")}>Go to Events</button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px' }}>
            <header className="page-header">
                <h1 className="page-title">Book Tickets</h1>
            </header>

            <div className="card" style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary)' }}>
                    {eventName || "Loading Event..."}
                </h2>
                
                <div className="input-group">
                    <label className="input-label">Attendee Name</label>
                    <input
                        className="input-field"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            <div className="card">
                <h3 style={{ fontSize: '16px', marginBottom: '24px', fontWeight: '600' }}>Select Your Seat</h3>

                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(5, 1fr)", 
                    gap: "12px", 
                    maxWidth: "500px", 
                    margin: "0 auto 32px auto",
                    padding: '20px',
                    background: '#F1F5F9',
                    borderRadius: '16px'
                }}>
                    {
                        seats.map((s) => {
                            const isBooked = bookedSeats.includes(s);
                            const isSelected = seat === s;

                            return (
                                <button
                                    key={s}
                                    onClick={() => setSeat(s)}
                                    disabled={isBooked}
                                    style={{
                                        aspectRatio: '1',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        borderRadius: '10px',
                                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        backgroundColor: isBooked ? '#E2E8F0' : (isSelected ? '#EEF2FF' : '#FFFFFF'),
                                        color: isBooked ? '#94A3B8' : (isSelected ? 'var(--primary)' : 'var(--text-primary)'),
                                        cursor: isBooked ? "not-allowed" : "pointer",
                                        transition: '0.2s'
                                    }}
                                >
                                    {s}
                                    {isBooked && <div style={{ fontSize: '8px', marginTop: '2px' }}>SOLD</div>}
                                </button>
                            );
                        })
                    }
                </div>

                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border)',
                    paddingTop: '24px'
                }}>
                    <div>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Selected Seat</p>
                        <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)' }}>{seat || 'None'}</p>
                    </div>

                    <button
                        className="btn-primary"
                        onClick={bookTicket}
                        disabled={!seat || !name}
                        style={{ padding: '14px 40px' }}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};
