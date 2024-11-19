const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertShowtime() {
  try {
    // Connect to the MongoDB client
    await client.connect();
    
    const db = client.db('myshows');
    const showtime = db.collection('Showtime');
    
    // MongoDB command to insert a sample showtime
    const result = await showtime.insertOne({
    movieId: "zindagi_006",
    movieName: "Zindagi Na Milegi Dobara",
    showDate: "2024-11-11",
    showTime: "7:00 PM",
    theater: "Theater 1",
    ticketPrice: 12.99,
    totalRows: 10,
    seatsPerRow: 10,
    seatMatrix: [
    {
      row: "A",
      seats: [
        { seatNumber: "A1", status: "available", price: 12.99 },
        { seatNumber: "A2", status: "available", price: 12.99 },
        { seatNumber: "A3", status: "available", price: 12.99 },
        { seatNumber: "A4", status: "available", price: 12.99 },
        { seatNumber: "A5", status: "available", price: 12.99 },
        { seatNumber: "A6", status: "available", price: 12.99 },
        { seatNumber: "A7", status: "available", price: 12.99 },
        { seatNumber: "A8", status: "available", price: 12.99 },
        { seatNumber: "A9", status: "available", price: 12.99 },
        { seatNumber: "A10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "B",
      seats: [
        { seatNumber: "B1", status: "available", price: 12.99 },
        { seatNumber: "B2", status: "available", price: 12.99 },
        { seatNumber: "B3", status: "available", price: 12.99 },
        { seatNumber: "B4", status: "available", price: 12.99 },
        { seatNumber: "B5", status: "available", price: 12.99 },
        { seatNumber: "B6", status: "available", price: 12.99 },
        { seatNumber: "B7", status: "available", price: 12.99 },
        { seatNumber: "B8", status: "available", price: 12.99 },
        { seatNumber: "B9", status: "available", price: 12.99 },
        { seatNumber: "B10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "C",
      seats: [
        { seatNumber: "C1", status: "available", price: 12.99 },
        { seatNumber: "C2", status: "available", price: 12.99 },
        { seatNumber: "C3", status: "available", price: 12.99 },
        { seatNumber: "C4", status: "available", price: 12.99 },
        { seatNumber: "C5", status: "available", price: 12.99 },
        { seatNumber: "C6", status: "available", price: 12.99 },
        { seatNumber: "C7", status: "available", price: 12.99 },
        { seatNumber: "C8", status: "available", price: 12.99 },
        { seatNumber: "C9", status: "available", price: 12.99 },
        { seatNumber: "C10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "D",
      seats: [
        { seatNumber: "D1", status: "available", price: 12.99 },
        { seatNumber: "D2", status: "available", price: 12.99 },
        { seatNumber: "D3", status: "available", price: 12.99 },
        { seatNumber: "D4", status: "available", price: 12.99 },
        { seatNumber: "D5", status: "available", price: 12.99 },
        { seatNumber: "D6", status: "available", price: 12.99 },
        { seatNumber: "D7", status: "available", price: 12.99 },
        { seatNumber: "D8", status: "available", price: 12.99 },
        { seatNumber: "D9", status: "available", price: 12.99 },
        { seatNumber: "D10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "E",
      seats: [
        { seatNumber: "E1", status: "available", price: 12.99 },
        { seatNumber: "E2", status: "available", price: 12.99 },
        { seatNumber: "E3", status: "available", price: 12.99 },
        { seatNumber: "E4", status: "available", price: 12.99 },
        { seatNumber: "E5", status: "available", price: 12.99 },
        { seatNumber: "E6", status: "available", price: 12.99 },
        { seatNumber: "E7", status: "available", price: 12.99 },
        { seatNumber: "E8", status: "available", price: 12.99 },
        { seatNumber: "E9", status: "available", price: 12.99 },
        { seatNumber: "E10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "F",
      seats: [
        { seatNumber: "F1", status: "available", price: 12.99 },
        { seatNumber: "F2", status: "available", price: 12.99 },
        { seatNumber: "F3", status: "available", price: 12.99 },
        { seatNumber: "F4", status: "available", price: 12.99 },
        { seatNumber: "F5", status: "available", price: 12.99 },
        { seatNumber: "F6", status: "available", price: 12.99 },
        { seatNumber: "F7", status: "available", price: 12.99 },
        { seatNumber: "F8", status: "available", price: 12.99 },
        { seatNumber: "F9", status: "available", price: 12.99 },
        { seatNumber: "F10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "G",
      seats: [
        { seatNumber: "G1", status: "available", price: 12.99 },
        { seatNumber: "G2", status: "available", price: 12.99 },
        { seatNumber: "G3", status: "available", price: 12.99 },
        { seatNumber: "G4", status: "available", price: 12.99 },
        { seatNumber: "G5", status: "available", price: 12.99 },
        { seatNumber: "G6", status: "available", price: 12.99 },
        { seatNumber: "G7", status: "available", price: 12.99 },
        { seatNumber: "G8", status: "available", price: 12.99 },
        { seatNumber: "G9", status: "available", price: 12.99 },
        { seatNumber: "G10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "H",
      seats: [
        { seatNumber: "H1", status: "available", price: 12.99 },
        { seatNumber: "H2", status: "available", price: 12.99 },
        { seatNumber: "H3", status: "available", price: 12.99 },
        { seatNumber: "H4", status: "available", price: 12.99 },
        { seatNumber: "H5", status: "available", price: 12.99 },
        { seatNumber: "H6", status: "available", price: 12.99 },
        { seatNumber: "H7", status: "available", price: 12.99 },
        { seatNumber: "H8", status: "available", price: 12.99 },
        { seatNumber: "H9", status: "available", price: 12.99 },
        { seatNumber: "H10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "I",
      seats: [
        { seatNumber: "I1", status: "available", price: 12.99 },
        { seatNumber: "I2", status: "available", price: 12.99 },
        { seatNumber: "I3", status: "available", price: 12.99 },
        { seatNumber: "I4", status: "available", price: 12.99 },
        { seatNumber: "I5", status: "available", price: 12.99 },
        { seatNumber: "I6", status: "available", price: 12.99 },
        { seatNumber: "I7", status: "available", price: 12.99 },
        { seatNumber: "I8", status: "available", price: 12.99 },
        { seatNumber: "I9", status: "available", price: 12.99 },
        { seatNumber: "I10", status: "available", price: 12.99 }
      ]
    },
    {
      row: "J",
      seats: [
        { seatNumber: "J1", status: "available", price: 12.99 },
        { seatNumber: "J2", status: "available", price: 12.99 },
        { seatNumber: "J3", status: "available", price: 12.99 },
        { seatNumber: "J4", status: "available", price: 12.99 },
        { seatNumber: "J5", status: "available", price: 12.99 },
        { seatNumber: "J6", status: "available", price: 12.99 },
        { seatNumber: "J7", status: "available", price: 12.99 },
        { seatNumber: "J8", status: "available", price: 12.99 },
        { seatNumber: "J9", status: "available", price: 12.99 },
        { seatNumber: "J10", status: "available", price: 12.99 }
      ]
    }
  ],
  createdAt: new Date(),
  screenNumber: 3,
  totalSeats: 100,
  availableSeats: 100,
  bookedSeats: 0
    });

    console.log(`Inserted a showtime with id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error inserting showtime:', error);
  } finally {
    // Close the MongoDB client
    await client.close();
  }
}

// Call the function to insert the data
insertShowtime();
