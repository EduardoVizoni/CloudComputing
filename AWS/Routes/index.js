const express = require('express');
const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/images', imageRoutes);

module.exports = router;