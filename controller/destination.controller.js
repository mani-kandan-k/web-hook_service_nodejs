const db = require("../db/database");
const { v4: uuidv4 } = require("uuid");

// Create a new destination
const createDestination = (req, res) => {
  const { account_id, url, method, headers, created_by } = req.body;
  const updated_by = created_by;

  db.run(
    `INSERT INTO Destinations (account_id, url, method, headers, created_by, updated_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [account_id, url, method, JSON.stringify(headers), created_by, updated_by],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Get all destinations for an account
const getDestinationsByAccount = (req, res) => {
  const { account_id } = req.params;

  db.all(
    `SELECT * FROM Destinations WHERE account_id = ?`,
    [account_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// Delete a destination
const deleteDestination = (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM Destinations WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: "Destination not found" });
    res.json({ message: "Destination deleted successfully" });
  });
};

module.exports = {
  createDestination,
  getDestinationsByAccount,
  deleteDestination,
};
