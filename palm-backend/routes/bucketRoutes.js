const express = require("express");
const router = express.Router();
const multer = require('multer');
const { bucket_create, bucket_index, bucket_update, bucket_getOne, bucket_delete } = require("../controllers/bucketController");
const upload = multer({ dest: 'uploads/' });

router.get("/", bucket_index);
router.post("/create", upload.none(), bucket_create);
router.put("/:id", upload.none(), bucket_update);
router.get("/:id", bucket_getOne);
router.delete("/:id", bucket_delete);

module.exports = router;