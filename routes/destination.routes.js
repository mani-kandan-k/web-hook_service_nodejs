const express = require("express");
const router = express.Router();
const destinationController = require("../controller/destination.controller");

// Create a new destination
router.post("/", destinationController.createDestination);

// Delete a destination by ID
router.delete("/:id", destinationController.deleteDestination);

module.exports = router;
