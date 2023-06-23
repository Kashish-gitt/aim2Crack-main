const express = require('express');
const router = express.Router();
const defineUserModel = require('../../../models/user');
const userController = require('../../../controllers/UserController');

// Create a new user
router.post('/users', userController.createUser);

// // Get all users
// router.get('/users', userController.getAllUsers);

// Get a user by ID
router.get('/users/:id', userController.getUserById);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);

//new user
router.post('/users', async (req, res) => {
    try {
        const User = await defineUserModel();
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get all users
router.get('/users', async (req, res) => {
    try {
        const User = await defineUserModel();
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//user access by ID
router.get('/users/:id', async (req, res) => {
    try {
        const User = await defineUserModel();
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// update user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const User = await defineUserModel();
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const User = await defineUserModel();
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;