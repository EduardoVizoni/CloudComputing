const express = require('express');
const FileController = require('../Controller/fileController');

const router = express.Router();

router.post('/upload', FileController.uploadFile);
router.post('/download', FileController.downloadFile);

module.exports = router;