const db = require("../db/database");
const axios = require("axios");

// Extract token from headers
function extractToken(req) {
  return req.headers["cl-x-token"];
}

// Validate the token and retrieve the account
function getAccountByToken(token, callback) {
  db.get(`SELECT * FROM Accounts WHERE appSecret = ?`, [token], callback);
}

// Get all destinations for a given account
function getDestinations(accountId, callback) {
  db.all(
    `SELECT * FROM Destinations WHERE account_id = ?`,
    [accountId],
    callback
  );
}

// Forward the data to each destination
async function forwardToDestinations(destinations, data) {
  for (const dest of destinations) {
    try {
      const headers = JSON.parse(dest.headers);
      const method = dest.method.toUpperCase();

      const config = { headers };
      if (method === "GET") {
        await axios.get(dest.url, { ...config, params: data });
      } else if (method === "POST") {
        await axios.post(dest.url, data, config);
      } else if (method === "PUT") {
        await axios.put(dest.url, data, config);
      } else {
        console.warn(`Unsupported method: ${method}`);
      }
    } catch (e) {
      console.error(`Error forwarding to ${dest.url}: ${e.message}`);
    }
  }
}

// Controller handler
function handleIncomingData(req, res) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: "Un Authenticate" });

  const incomingData = req.body;

  getAccountByToken(token, (err, account) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!account) return res.status(401).json({ error: "Invalid Token" });

    getDestinations(account.accountId, async (err, destinations) => {
      if (err) return res.status(500).json({ error: err.message });

      await forwardToDestinations(destinations, incomingData);
      res.status(200).json({ message: "Data forwarded to all destinations." });
    });
  });
}

module.exports = { handleIncomingData };
