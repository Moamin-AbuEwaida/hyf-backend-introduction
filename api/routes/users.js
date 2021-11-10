const express = require('express');
const userController = require('../controllers/users');

const userRoutes = express.Router();

// userRoutes.get('/', userController.get);
// userRoutes.get('/:userId', userController.getUserById);
// userRoutes.delete('/users/:userId', userController.delete);
// userRoutes.put('/users/:userId', userController.put);
userRoutes.post('/register', userController.registerUser);
userRoutes.post('/login', userController.loginUser);
userRoutes.get('/logout', userController.logoutUser);

module.exports = userRoutes;
