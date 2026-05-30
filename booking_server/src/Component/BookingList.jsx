import { useEffect,useState } from "react";
import axios from "axios";

export const BookingList = ()=>{

    const [bookings,setBookings] =
    useState([]);

    const fetchBookings =
    async()=>{

        try{

            const response =
            await axios.get(

                "http://localhost:8080/bookings"

            );

            setBookings(
                response.data
            );

        }

        catch(error){

            console.log(error);

        }

    };

    useEffect(()=>{

        fetchBookings();

    },[]);

    return(

        <div>

            <h1>Bookings</h1>

            {

                bookings.map((booking)=>{

                    return(

                        <div

                        key={
                        booking.booking_id
                        }

                        >

                            <h3>

                                {
                                booking.user_name
                                }

                            </h3>

                            <p>

                                Seat :

                                {
                                booking.seat_number
                                }

                            </p>

                        </div>

                    );

                })

            }

        </div>

    );

};