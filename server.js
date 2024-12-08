const express = require("express");
const axios = require("axios");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const { check, validationResult, param } = require("express-validator");
require("dotenv").config();

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


app.post("/api/signup", async (req, res) => {
    const { name, password } = req.body;
  
    console.log(req.body);
  
    try {
      const connection = await mysql.createConnection(dbConfig);
      if (connection) {
        console.log("connected");
      } else {
        console.log("not connected");
      }
      const [existingUser] = await connection.execute(
        "SELECT id FROM users WHERE name = ?",
        [name]
      );
      if (existingUser.length > 0) {
        await connection.end();
        return res.status(400).json({ msg: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await connection.execute(
        "INSERT INTO users (name, password) VALUES (?, ?)",
        [name, hashedPassword]
      );
      await connection.end();
      res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });