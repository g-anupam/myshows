const express = require("express");
const router = express.Router();
const { client } = require("./../db");
const { default: chalk } = require("chalk");
const db = client.db("myshows");
const bookings = db.collection("Bookings");

router.get("/:userEmail", async (req, res) => {
    try {
        const { userEmail } = req.params;
        const bookingsInfo = await bookings.find({ userEmail }).toArray();

        if (bookingsInfo.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        res.json(bookingsInfo);
    } catch (error) {
        console.error(chalk.red("Error fetching internal bookings: ", error));
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router; 