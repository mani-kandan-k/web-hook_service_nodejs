const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller");

// Create new account
router.post("/", accountController.createAccount);

// Get all accounts
router.get("/", accountController.getAllAccounts);

// Get account by account_id
router.get("/:accountId", accountController.getAccountById);

// Update account
router.put("/:accountId", accountController.updateAccount);

// Delete account
router.delete("/:accountId", accountController.deleteAccount);

module.exports = router;
