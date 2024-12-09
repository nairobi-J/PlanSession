const { dbConfig } = require('../config/db');
const { createPool } = require('../config/createPool');

const bookSlot = async (req, res) => {
    const userId = req.user.id;
    const { eventId } = req.body;

    if (!userId || !eventId) {
        return res.status(400).json({ msg: "User ID and Event ID are required." });
    }

    const pool = createPool(dbConfig); // Create the pool

    let connection;

    try {
        connection = await pool.getConnection(); // Get a connection from the pool

        // Check for conflicts
        const [conflictResults] = await connection.execute(
            `SELECT * FROM events WHERE id = ? AND status = 'Booked'`,
            [eventId]
        );

        if (conflictResults.length > 0) {
            return res.status(400).json({ msg: "The slot is already booked. Please choose another slot." });
        }

        // Proceed to book the slot
        const [bookingResult] = await connection.execute(
            `INSERT INTO bookings (eventId, userId, status) VALUES (?, ?, 'Pending')`,
            [eventId, userId]
        );

        // Update event status
        await connection.execute(
            `UPDATE events SET status = 'Booked' WHERE id = ?`,
            [eventId]
        );

        res.status(201).json({ bookingId: bookingResult.insertId, msg: "Slot booked successfully." });
    } catch (error) {
        console.error('Error booking slot:', error);
        res.status(500).json({ msg: "Server error occurred while booking the slot." });
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
};

module.exports = { bookSlot };