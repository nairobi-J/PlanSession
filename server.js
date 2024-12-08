const express = require("express");
const axios = require("axios");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const { check, validationResult, param } = require("express-validator");
require("dotenv").config();

const {signup, login} = require('./controller/user')

const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());


const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "planSession",
};


app.post("/api/signup", signup);
  

  app.post("/api/login", login);

  app.post('/api/events', async (req, res) => {
    const { userId, startTime, endTime, type, status } = req.body;
  
    if (!userId || !startTime || !endTime || !type || !status) {
      return res.status(400).json({ msg: "All fields are required." });
    }
  
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        `INSERT INTO events (userId, startTime, endTime, type, status) 
         VALUES (?, ?, ?, ?, ?)`,
        [userId, startTime, endTime, type, status]
      );
  
      await connection.end();
      res.status(201).json({ id: result.insertId, msg: "Event created successfully." });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ msg: "Server error." });
    }
  });

  app.get('/api/events', async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [events] = await connection.execute('SELECT * FROM events');
  
      await connection.end();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ msg: "Server error." });
    }
  });
  
  app.get('/api/events/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [events] = await connection.execute(
        'SELECT * FROM events WHERE userId = ?',
        [userId]
      );
  
      await connection.end();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching user events:', error);
      res.status(500).json({ msg: "Server error." });
    }
  });

  app.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const { startTime, endTime, type, status } = req.body;
  
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        `UPDATE events SET startTime = ?, endTime = ?, type = ?, status = ? 
         WHERE id = ?`,
        [startTime, endTime, type, status, id]
      );
  
      await connection.end();
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Event not found." });
      }
  
      res.status(200).json({ msg: "Event updated successfully." });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ msg: "Server error." });
    }
  });
  
  app.delete('/api/events/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        'DELETE FROM events WHERE id = ?',
        [id]
      );
  
      await connection.end();
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Event not found." });
      }
  
      res.status(200).json({ msg: "Event deleted successfully." });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ msg: "Server error." });
    }
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });