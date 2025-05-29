const db = require("../db/database");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

// Create a new account
const createAccount = (req, res) => {
  const { email, accountName, website, createdBy } = req.body;
  const accountId = uuidv4();
  const appSecret = crypto.randomBytes(32).toString("hex");
  const updatedBy = createdBy;

  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }

  if (!accountName) {
    return res.status(400).json({ error: "account name is required" });
  }

  db.run(
    `INSERT INTO Accounts (email, accountId, accountName, appSecret, website, createdBy, updatedBy)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [email, accountId, accountName, appSecret, website, createdBy, updatedBy],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, accountId, appSecret });
    }
  );
};

// Get all accounts
const getAllAccounts = (req, res) => {
  db.all(`SELECT * FROM Accounts`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get account by accountId
const getAccountById = (req, res) => {
  const { accountId } = req.params;
  if (!accountId) {
    return res.status(400).json({ error: "account-id name is required" });
  }
  db.get(
    `SELECT * FROM Accounts WHERE accountId = ?`,
    [accountId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Account not found" });
      res.json(row);
    }
  );
};

// Update account
const updateAccount = (req, res) => {
  const { accountId } = req.params;
  const { email, accountName, website, updatedBy } = req.body;
  if (!accountId) {
    return res.status(400).json({ error: "account-id name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }
  if (!accountName) {
    return res.status(400).json({ error: "account name is required" });
  }
  db.run(
    `UPDATE Accounts
     SET email = ?, accountName = ?, website = ?, updatedBy = ?, updatedAt = CURRENT_TIMESTAMP
     WHERE accountId = ?`,
    [email, accountName, website, updatedBy, accountId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Account not found" });
      res.json({ message: "Account updated successfully" });
    }
  );
};

// Delete account
const deleteAccount = (req, res) => {
  const { accountId } = req.params;
  if (!accountId) {
    return res.status(400).json({ error: "account-id name is required" });
  }
  db.run(
    `DELETE FROM Accounts WHERE accountId = ?`,
    [accountId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Account not found" });
      res.json({ message: "Account and related destinations deleted" });
    }
  );
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
};
