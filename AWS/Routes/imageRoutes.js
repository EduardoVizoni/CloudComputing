const express = require('express');
const imageController = require('../Controller/imageController');

const router = express.Router();

router.get('/user/:userId', imageController.getImagesByUserId);
router.post('/', upload.single('image'), imageController.createImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;