const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.user_index);
router.post("/login", userController.user_login);
router.post("/", userController.user_create);
router.post("/reset", userController.reset_password);
router.post("/verify", userController.verify_email);
router.post("/update_password", userController.update_password);

module.exports = router;