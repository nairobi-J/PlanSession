

const getBookings = async (req, res) => {
    const userId = req.user.id; // Get userId from token (or session)

    const pool = createPool(dbConfig); // Create the pool

    let connection;

    try {
        connection = await pool.getConnection(); // Get a connection from the pool

        // Fetch all bookings for this user
        const [bookings] = await connection.execute(
            `SELECT b.id AS bookingId, b.status, e.name AS eventName, e.date AS eventDate 
             FROM bookings b
             JOIN events e ON b.eventId = e.id
             WHERE b.userId = ?`, 
            [userId]
        );

        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ msg: "Server error occurred while fetching bookings." });
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
};

module.exports = { getBookings };
