const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { client } = require("./../db");
const chalk = require("chalk");

const db = client.db("myshows");
const bookings = db.collection("Bookings");
const showtimes = db.collection("Showtime");

router.get("/:userEmail", async (req, res) => {
    try {
        const { userEmail } = req.params;
        console.log(chalk.blue(`Fetching bookings for email: ${userEmail}`));

        const bookingsInfo = await bookings.find({ userEmail }).toArray();
        console.log(chalk.green(`Found ${bookingsInfo.length} bookings`));
        console.log(chalk.yellow('Booking details:'), bookingsInfo);
        
        if (bookingsInfo.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }
        
        // Fetch additional showtime details for each booking
        const bookingsWithShowtimeDetails = await Promise.all(bookingsInfo.map(async (booking) => {
            try {
                console.log(chalk.blue(`Fetching showtime for showtimeId: ${booking.showtimeId}`));
                
                const showtimeDetails = await showtimes.findOne({ 
                    _id: new ObjectId(booking.showtimeId) 
                });
                
                console.log(chalk.green('Showtime details:'), showtimeDetails);
                
                return {
                    ...booking,
                    showtimeDetails: showtimeDetails || null
                };
            } catch (error) {
                console.error(chalk.red(`Error fetching showtime for booking ${booking._id}: `, error));
                return {
                    ...booking,
                    showtimeDetails: null
                };
            }
        }));
        
        console.log(chalk.green('Final bookings with showtime details:'), bookingsWithShowtimeDetails);
        res.json(bookingsWithShowtimeDetails);
    } catch (error) {
        console.error(chalk.red("Error fetching internal bookings: ", error));
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
