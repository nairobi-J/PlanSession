const {dbConfig} = require('../config/db')
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

const { check, validationResult, param } = require("express-validator");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
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
  }

  const login =  async (req, res) => {
    //  const { name, password } = req.body;
      console.log(req.body);
      
  
      let name = req.body.fName
      let password = req.body.fPass

      if(name == undefined && password == undefined){
        name = req.body.name
        password = req.body.password
      }
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
    }

    const getUser = async(req, res)=>{
      if(!req.user){
        return res.status(401).json({msg: "Not authenticated"});
      }
      try{
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM users WHERE id =?", [req.user.id]);
        await connection.end();
        res.json(rows[0]);
      }catch(error){
        res.status(500).json({error: "Server error"});
      }
    }

    const getUserById = async (req, res)=>{
      const userId = req.params.id;
      try{
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM users WHERE id =?", [userId]);
        await connection.end();
        if(rows.length === 0){
          return res.status(404).json({msg: "User not found"});
        }
        res.json(rows[0]);
      }catch(error){
        res.status(500).json({error: "Server error"});
      }
    }
  module.exports = {signup, login, getUser, getUserById}