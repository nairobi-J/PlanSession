const express = require("express");
const cors = require("cors");
const { dbConfig } = require("../config/db");
const { createPool } = require("../config/createPool");

// Create a connection pool
const pool = createPool(dbConfig);

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { title, message, type, userId } = req.body;

    const [result] = await pool.query(
      "INSERT INTO notifications (title, message, type, user_id) VALUES (?, ?, ?, ?)",
      [title, message, type, userId]
    );

    res.status(201).json({ message: "Notification created successfully", notificationId: result.insertId });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all notifications (optionally for a specific user)
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;

    const query = userId
      ? "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC"
      : "SELECT * FROM notifications ORDER BY created_at DESC";

    const [notifications] = await pool.query(query, userId ? [userId] : []);

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("UPDATE notifications SET is_read = ? WHERE id = ?", [true, id]);

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM notifications WHERE id = ?", [id]);

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createNotification , getNotifications , markAsRead , deleteNotification}