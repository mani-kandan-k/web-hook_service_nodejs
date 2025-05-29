const express = require("express");
const router = express.Router();
const incomingController = require("../controller/incoming.controller");

// Create a new destination
router.post("/", incomingController.handleIncomingData);

module.exports = router;
