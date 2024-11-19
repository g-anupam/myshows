import { useEffect, useState } from 'react';
import "./BookedShows.css";

function BookedShows() {
    const [bookedShows, setBookedShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState(''); // New state for firstName
    const userEmail = sessionStorage.getItem('userEmail');
    console.log('fetched email: ', userEmail);

    // Retrieve firstName from sessionStorage when the component mounts
    useEffect(() => {
        const storedFirstName = sessionStorage.getItem('userFirstName');
        console.log("stored first name: ", storedFirstName);
        if (storedFirstName) {
            setFirstName(storedFirstName);
        }
    }, []);

    console.log("first name: ", firstName);
    useEffect(() => {
        async function fetchBookedShows() {
            try {
                const response = await fetch(`http://localhost:3000/bookings/${userEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await response.json();
                console.log("Booked shows data: ", data);
                setBookedShows(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (userEmail) {
            fetchBookedShows();
        }
    }, [userEmail]);

    if (loading) {
        return <div>Please sign in to view booked shows</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div id="booked">
            <h2>Your Booked Shows</h2>
            {firstName && <h3>Welcome, {firstName}!</h3>} {/* Display firstName */}
            {bookedShows.length === 0 ? (
                <p>You have no bookings</p>
            ) : (
                <div>
                    {bookedShows.map((booking, index) => (
                        <div key={index} className="booking-details">
                            <p><strong>Showtime Id : </strong> {booking.showtimeId}</p>
                            <p><strong>Time : </strong> {booking.showtimeDetails.showTime} </p>
                            <p><strong>Seats : </strong> {booking.seats.join(', ')}</p>
                            <p><strong>Booking date : </strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            <p><strong>Theater :  </strong> {booking.showtimeDetails.theater} </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookedShows;
