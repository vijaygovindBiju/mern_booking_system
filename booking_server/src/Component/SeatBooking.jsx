import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const SeatBooking = ()=>{

    const { event_id } = useParams();
    const navigate = useNavigate();

    const [name,setName] =
    useState("");

    const [seat,setSeat] =
    useState("");

    const bookTicket =
    async()=>{

        try{

            const body = {

                booking_id:Math.random(),

                user_name:name,

                event_id:event_id,

                seat_number:seat

            };

            const response =
            await axios.post(

                "http://localhost:8080/book",

                body

            );

            alert(response.data);
            
            if(response.data === "Booking Successful") {
                navigate("/bookings");
            }

        }

        catch(error){

            console.log(error);

        }

    };

    const seats = [

        "A1","A2","A3","A4","A5",

        "B1","B2","B3","B4","B5",

        "C1","C2","C3","C4","C5"

    ];

    return(

        <div>

            <h1>Book Ticket</h1>

            <input

                placeholder="Name"

                value={name}

                onChange={(e)=>
                setName(e.target.value)}

            />

            <h3>Select Seat</h3>

            {
                seats.map((s)=>{

                    return(

                        <button

                            key={s}

                            onClick={()=>
                            setSeat(s)}

                        >

                            {s}

                        </button>

                    );

                })
            }

            <h3>

                Selected Seat :
                {seat}

            </h3>

            <button
            onClick={bookTicket}>

                Book Ticket

            </button>

        </div>

    );

};