import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const SeatBooking = () => {
    const { event_id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [seat, setSeat] = useState("");
    const [bookedSeats, setBookedSeats] = useState([]);
    const [eventName, setEventName] = useState("");

    const fetchEventData = async () => {
        try {
            // Fetch events to get the name
            const eventsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
            const currentEvent = eventsResponse.data.find(e => String(e.event_id) === String(event_id));
            if (currentEvent) {
                setEventName(currentEvent.event_name);
            }

            // Fetch bookings for seat availability
            const bookingsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/bookings`);
            const currentEventBookings = bookingsResponse.data
                .filter(b => String(b.event_id) === String(event_id))
                .map(b => b.seat_number);
            setBookedSeats(currentEventBookings);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEventData();
    }, [event_id]);

    const bookTicket = async () => {
        try {
            const body = {
                booking_id: Date.now(),
                user_name: name,
                event_id: event_id,
                seat_number: seat
            };

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/book`, body);
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

    return (
        <div>
            <h1>Book Ticket for {eventName || "Loading..."}</h1>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <h3>Select Seat</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", maxWidth: "400px", margin: "20px 0" }}>
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
                                    backgroundColor: isBooked ? "#ffcccc" : (isSelected ? "#4CAF50" : "#fff"),
                                    color: isBooked ? "#990000" : (isSelected ? "#fff" : "#000"),
                                    cursor: isBooked ? "not-allowed" : "pointer",
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    borderRadius: "4px"
                                }}
                            >
                                {s}
                                {isBooked && <div style={{ fontSize: "8px" }}>TAKEN</div>}
                            </button>
                        );
                    })
                }
            </div>

            <h3>Selected Seat: {seat}</h3>

            <button
                onClick={bookTicket}
                disabled={!seat || !name}
            >
                Book Ticket
            </button>
        </div>
    );
};
