const express = require("express");
require("dotenv").config();
const cors = require("cors"); // Import cors
const { connectToDatabase } = require("./db");
const Stripe = require("stripe"); // Import Stripe

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your test Stripe Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const authRoutes = require('./routes/auth');
const seats = require("./routes/seats");
const bookings = require("./routes/bookings");
const user = require("./routes/user");

// Enable CORS for all routes
app.use(cors()); 

connectToDatabase().catch((error) => {
  console.error("Database connection failed: ", error);
  process.exit(1);
});

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/seats",seats);
app.use("/bookings", bookings);
app.use("/user", user);

// Stripe payment intent route
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents (e.g., 1000 = $10.00)
            currency: 'usd', // Change currency as needed
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
  res.send("Mongo DB native Driver up and running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
