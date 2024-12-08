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

  app.post('/api/events', postEvent);

  app.get('/api/events', getAllEvents);
  
  app.get('/api/events/:userId', getUserEvents);

  app.put('/api/events/:id', updateEvents);
  
  app.delete('/api/events/:id', deleteEvents);
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });