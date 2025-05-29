// db/database.js
const sqlite3 = require("sqlite3").verbose();

// Create and export DB instance
const db = new sqlite3.Database("../webhook.db", (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

module.exports = db;
