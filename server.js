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
    const { name, email, password, timezone} = req.body;
  
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
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);

    const hashedPassword = password;
      await connection.execute(
        "INSERT INTO users (name, email, password, timezone) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, timezone]
      );
      await connection.end();
      res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

  app.post("/api/login", async (req, res) => {
  //  const { name, password } = req.body;
    console.log(req.body);
    

    const name = req.body.fName
    const password = req.body.fPass
    console.log(name)
    console.log(password)
    try {
      const connection = await mysql.createConnection(dbConfig);
  
      const [rows] = await connection.execute(
        "SELECT id, name, password FROM users where name = ?",
        [name]
      );
  
      if (rows.length === 0) {
        await connection.end();
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  
      const user = rows[0];

      console.log(password + " " + user.password)
  
      const isMatch = (password == user.password)
  
      if (!isMatch) {
        await connection.end();
        return res.status(400).json({ msg: "Wrong Password" });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
  
      await connection.end();
  
      res.json({ token });
    } catch (error) {}
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });