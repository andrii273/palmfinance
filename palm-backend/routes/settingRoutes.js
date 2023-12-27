const express = require("express");
const { user_index, profile_update, contact_form } = require("../controllers/settingController");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/user/:id', user_index);
router.put('/user/profile/:id', upload.none(), profile_update);
router.post('/contact', upload.none(), contact_form);
module.exports = router;