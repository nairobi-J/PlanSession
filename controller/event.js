
const {dbConfig} = require('../config/db')
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const postEvent = async (req, res) => {
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
  }

  const getAllEvents = async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [events] = await connection.execute('SELECT * FROM events');
  
      await connection.end();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ msg: "Server error." });
    }
  }

  const getUserEvents = async (req, res) => {
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
  }

  const updateEvents = async (req, res) => {
    const { id } = req.params;
    const { startTime, endTime, type, status } = req.body;
  
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        `UPDATE events SET startTime = ?, endTime = ?, type = ?, status = ? 
         WHERE eventId = ?`,
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
  }

  const deleteEvents = async (req, res) => {
    const { id } = req.params;
  
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [result] = await connection.execute(
        'DELETE FROM events WHERE eventId = ?',
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
  }

module.exports = {postEvent, getAllEvents, getUserEvents, updateEvents, deleteEvents}