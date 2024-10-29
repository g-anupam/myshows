const express = require("express");
const cors = require("cors"); // Import cors
const { connectToDatabase } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');

// Enable CORS for all routes
app.use(cors()); 

connectToDatabase().catch((error) => {
  console.error("Database connection failed: ", error);
  process.exit(1);
});

app.use(express.json());
app.use("/", authRoutes);

app.get('/', (req, res) => {
  res.send("Mongo DB native Driver up and running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
