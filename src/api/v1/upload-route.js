const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../../middleware/multer');
const { UploadController } = require('../../controller');

router.post('/:id', uploadMiddleware, UploadController.upload);

module.exports = router;
