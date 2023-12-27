const express = require("express");
const { account_index, account_create, account_update, account_getOne, account_delete } = require("../controllers/accountController");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/", account_index);
router.post("/create", upload.none(), account_create);
router.put("/:id", upload.none(), account_update);
router.get("/:id", account_getOne);
router.delete("/:id", account_delete);

module.exports = router;