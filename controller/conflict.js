const { dbConfig } = require('../config/db');
const { createPool } = require('../config/createPool');

// Create a pool instance
const pool = createPool(dbConfig);

const checkEventConflict = async (req, res) => {
    const { startTime, endTime, date } = req.body;

    const query = `
        SELECT * FROM events
        WHERE date = ? AND (
            (startTime <= ? AND endTime >= ?) OR
            (startTime >= ? AND endTime <= ?)
        )
    `;

    try {
        const [results] = await pool.execute(query, [date, startTime, startTime, endTime, endTime]);

        if (results.length > 0) {
            return res.status(400).send({ msg: 'Event time conflicts with another event.' });
        }

        res.status(200).send({ msg: 'No conflict found.' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ msg: 'Server error.' });
    }
};

const checkBookingConflict = async (req, res) => {
    const { eventId } = req.body;

    const query = `
        SELECT * FROM events
        WHERE id = ? AND status = 'Booked'
    `;

    try {
        const [results] = await pool.execute(query, [eventId]);

        if (results.length > 0) {
            return res.status(400).send({ msg: 'Slot is already booked.' });
        }

        res.status(200).send({ msg: 'Slot is available for booking.' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ msg: 'Server error.' });
    }
};

const resolveConflict = async (req, res) => {
    const { EventID, ConflictingEventID } = req.body;

    const insertConflictQuery = `
        INSERT INTO ConflictResolution (EventID, ConflictingEventID)
        VALUES (?, ?)
    `;

    try {
        const [results] = await pool.execute(insertConflictQuery, [EventID, ConflictingEventID]);

        res.status(201).send({ message: 'Conflict logged successfully.', ConflictID: results.insertId });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ msg: 'Server error.' });
    }
};

const getConflicts = async (req, res) => {
    const query = `
        SELECT * FROM ConflictResolution
        ORDER BY Timestamp DESC
    `;

    try {
        const [results] = await pool.execute(query);

        res.status(200).send(results);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ msg: 'Server error.' });
    }
};

const suggestAlternateSlots = async (req, res) => {
    const { date, duration } = req.body;

    const query = `
        SELECT startTime, endTime
        FROM events
        WHERE date = ?
        ORDER BY startTime ASC
    `;

    try {
        const [results] = await pool.execute(query, [date]);

        let availableSlots = [];
        let lastEndTime = "00:00:00";

        for (const event of results) {
            const gap = (new Date(`1970-01-01T${event.startTime}`) - new Date(`1970-01-01T${lastEndTime}`)) / 60000;
            if (gap >= duration) {
                availableSlots.push({
                    startTime: lastEndTime,
                    endTime: event.startTime,
                });
            }
            lastEndTime = event.endTime;
        }

        res.status(200).send({
            msg: 'Conflict detected. Alternate slots suggested.',
            availableSlots,
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ msg: 'Server error.' });
    }
};

module.exports = { checkEventConflict, checkBookingConflict, resolveConflict, getConflicts, suggestAlternateSlots};
