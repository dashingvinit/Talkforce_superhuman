const express = require('express');
const router = express.Router();

const uploadRoutes = require('./upload-route');

router.use('/upload', uploadRoutes);

module.exports = router;
