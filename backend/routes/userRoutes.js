const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Logs a registered user in 
router.post('/login', userController.loginUser);

// Registers a new user
router.post('/register', userController.createUser);

// Retrieves a user's enrolled courses
router.get('/:userId', userController.getCourses);

// Updates a user's enrolled courses
router.put('/:userId/', userController.updateCourses);

