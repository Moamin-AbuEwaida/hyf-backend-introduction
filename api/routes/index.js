/* eslint-disable lines-around-directive */
/* eslint-disable import/order */

const channelRoutes = require('./channels');
const messageRoutes = require('./messages');
const userRoutes = require('./users');

const express = require('express');

// require routes files

const router = express.Router();
router.use('/channels', channelRoutes);
router.use('/', messageRoutes);
router.use('/users', userRoutes);

// use routes with this router

// export the routes
module.exports = router;
