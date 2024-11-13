const express = require('express');
const router = express.Router();
const { client } = require('./../db');
const { ObjectId } = require('mongodb');
const db = client.db('myshows');
const showtime = db.collection('Showtime');

let chalk;
(async () => {
  chalk = (await import('chalk')).default;
})();

// Get showtime details by time
router.post('/showtime', async (req, res) => {
  console.log("POST /showtime route was hit");
  try {
    const { showTime } = req.body;
    console.log("Requested showtime:", showTime);
    
    const result = await showtime.findOne({ showTime });
    
    if (!result) {
      console.log(chalk.red(`Showtime not found with time: ${showTime}`));
      return res.status(404).json({ message: 'Showtime not found' });
    }
    
    console.log(chalk.green(`Successfully retrieved showtime: ${showTime}`));
    res.json(result);
    
  } catch (error) {
    console.error(chalk.red('Error fetching showtime:', error));
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Book seats for a showtime
router.post('/book', async (req, res) => {
  console.log("book api hit!");
  try {
    const { showtimeId, seats, userEmail } = req.body;

    // Validate request body
    if (!showtimeId || !seats || !seats.length || !userEmail) {
      return res.status(400).json({ message: 'Missing required booking information' });
    }

    // Start a transaction (session)
    const session = client.startSession();
    
    try {
      await session.withTransaction(async () => {
        // Get current showtime data
        const currentShowtime = await showtime.findOne(
          { _id: new ObjectId(showtimeId) }
        );

        if (!currentShowtime) {
          throw new Error('Showtime not found');
        }

        // Check if seats are available
        const unavailableSeats = [];
        seats.forEach(seatNumber => {
          const [rowLetter, seatNum] = [seatNumber[0], parseInt(seatNumber.slice(1))];
          const rowIndex = currentShowtime.seatMatrix.findIndex(r => r.row === rowLetter);
          const seat = currentShowtime.seatMatrix[rowIndex].seats[seatNum - 1];
          
          if (seat.status === 'booked') {
            unavailableSeats.push(seatNumber);
          }
        });

        if (unavailableSeats.length > 0) {
          throw new Error(`Seats ${unavailableSeats.join(', ')} are already booked`);
        }

        // Update seat status to booked
        const updatePromises = seats.map(seatNumber => {
          const [rowLetter, seatNum] = [seatNumber[0], parseInt(seatNumber.slice(1))];
          return showtime.updateOne(
            { 
              _id: new ObjectId(showtimeId),
              'seatMatrix.row': rowLetter
            },
            {
              $set: {
                [`seatMatrix.$.seats.${seatNum - 1}.status`]: 'booked',
                [`seatMatrix.$.seats.${seatNum - 1}.bookedBy`]: userEmail,
                [`seatMatrix.$.seats.${seatNum - 1}.bookedAt`]: new Date()
              }
            }
          );
        });

        await Promise.all(updatePromises);
      });

      console.log(chalk.green(`Successfully booked seats for showtime: ${showtimeId}`)); //Currently it works till here
      res.json({ message: 'Seats booked successfully' });
    } catch (error) {
      console.error(chalk.red('Error during booking transaction:', error));
      res.status(400).json({ message: error.message });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(chalk.red('Error booking seats:', error));
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*


// Get all showtimes for a specific movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    const results = await showtime.find({ movieId: req.params.movieId }).toArray();
    console.log(chalk.green(`Retrieved ${results.length} showtimes for movie: ${req.params.movieId}`));
    res.json(results);
  } catch (error) {
    console.error(chalk.red('Error fetching movie showtimes:', error));
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new showtime
router.post('/create', async (req, res) => {
  try {
    const { movieId, movieName, showDate, showTime, theater, ticketPrice, totalRows, seatsPerRow } = req.body;

    // Generate seat matrix
    const seatMatrix = [];
    for (let i = 0; i < totalRows; i++) {
      const row = String.fromCharCode(65 + i); // Convert 0 to 'A', 1 to 'B', etc.
      const seats = [];
      
      for (let j = 1; j <= seatsPerRow; j++) {
        seats.push({
          seatNumber: `${row}${j}`,
          status: 'available',
          price: ticketPrice
        });
      }
      
      seatMatrix.push({
        row,
        seats
      });
    }

    const newShowtime = {
      movieId,
      movieName,
      showDate,
      showTime,
      theater,
      ticketPrice,
      totalRows,
      seatsPerRow,
      seatMatrix,
      createdAt: new Date()
    };

    const result = await showtime.insertOne(newShowtime);
    console.log(chalk.green(`Created new showtime with ID: ${result.insertedId}`));
    res.status(201).json({ _id: result.insertedId, ...newShowtime });
  } catch (error) {
    console.error(chalk.red('Error creating showtime:', error));
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/
/*
// Get available seats for a showtime
router.get('/available/:showtimeId', async (req, res) => {
  try {
    const result = await showtime.findOne(
      { _id: new ObjectId(req.params.showtimeId) },
      { projection: { seatMatrix: 1 } }
    );

    if (!result) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    const availableSeats = result.seatMatrix.map(row => ({
      row: row.row,
      seats: row.seats.filter(seat => seat.status === 'available')
    }));

    console.log(chalk.green(`Retrieved available seats for showtime: ${req.params.showtimeId}`));
    res.json(availableSeats);
  } catch (error) {
    console.error(chalk.red('Error fetching available seats:', error));
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update showtime details
router.put('/update/:id', async (req, res) => {
  try {
    const showtimeId = new ObjectId(req.params.id);
    const updateData = req.body;
    delete updateData._id; // Remove _id if present in update data

    const result = await showtime.updateOne(
      { _id: showtimeId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      console.log(chalk.yellow(`No showtime found with ID: ${req.params.id}`));
      return res.status(404).json({ message: 'Showtime not found' });
    }

    console.log(chalk.green(`Successfully updated showtime: ${req.params.id}`));
    res.json({ message: 'Showtime updated successfully' });
  } catch (error) {
    console.error(chalk.red('Error updating showtime:', error));
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/
module.exports = router;

