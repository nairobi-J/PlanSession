const express = require("express");
const axios = require("axios");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const { check, validationResult, param } = require("express-validator");
require("dotenv").config();

const {signup, login} = require('./controller/user');
const { postEvent, getAllEvents, getUserEvents, updateEvents, deleteEvents } = require("./controller/event");
const { startTime, duration, topUsers, topTypes, peakDays, averageDuration } = require("./controller/analysis");


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
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });