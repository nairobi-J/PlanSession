const express = require("express");
const axios = require("axios");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const { check, validationResult, param } = require("express-validator");
require("dotenv").config();

const {signup, login, getUser, getUserById} = require('./controller/user');
const { postEvent, getAllEvents, getUserEvents, updateEvents, deleteEvents } = require("./controller/event");
const { startTime, duration, topUsers, topTypes, peakDays, averageDuration } = require("./controller/analysis");
const {bookSlot} = require("./controller/booking");
const { checkEventConflict, checkBookingConflict, resolveConflict, getConflicts, suggestAlternateSlots } = require("./controller/conflict");
const { createNotification, getNotifications, markAsRead , deleteNotification} = require("./controller/notification");

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

const authMiddleware = async (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log(req.body)
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };

app.post("/api/signup", signup);
app.post("/api/login", login);
app.get('/api/getUser', authMiddleware, getUser);
app.get('/api/user/:id', getUserById)

app.post('/api/events',authMiddleware, postEvent);
app.get('/api/events', getAllEvents);
app.get('/api/events/user',authMiddleware, getUserEvents);
app.put('/api/events/:id', updateEvents);
app.delete('/api/events/:id', deleteEvents);

  app.get('/api/analysis/startTime', startTime);
  app.get('/api/analysis/duration', duration);
  app.get('/api/analysis/topUsers', topUsers);
  app.get('/api/analysis/topTypes', topTypes);
  app.get('/api/analysis/peakDays', peakDays);
  app.get('/api/analysis/averageDuration', averageDuration);

  app.post('/api/booking', authMiddleware, bookSlot);

  // app.get('/api/booking/:id', getBooking);
  // app.put('/api/booking/:id', updateBooking);
  // app.delete('/api/booking/:id', deleteBooking);

  // app.get('/api/booking/user/:id', getUserBookings);

  // app.get('/api/booking/date/:date', getBookingsByDate);

  // app.get('/api/booking/type/:type', getBookingsByType);

  // app.get('/api/booking/slot/:start/:end', getAvailableSlots);

  // app.get('/api/booking/conflict/:id', getConflictingBookings);

  // app.get('/api/booking/available/:id', getAvailableBookings);

  // app.get('/api/booking/duration/:id', getBookingDuration);

  app.post('/api/conflict/checkEvent', checkEventConflict);
  app.post('/api/conflict/checkBooking', checkBookingConflict);
  app.post('/api/conflict/resolve', resolveConflict);
  app.get('/api/conflict', getConflicts)
  app.post('/api/conflict/suggest', suggestAlternateSlots)
  app.post('/api/notifications' , createNotification)
  app.get('/api/notifications',getNotifications)
  app.put('/api/notifications/:id/read' , markAsRead)
  app.delete('/api/notifications/:id',deleteNotification)
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });