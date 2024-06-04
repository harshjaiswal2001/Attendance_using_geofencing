const express = require('express');
const User = require('../models/User');
const fs = require('fs').promises; // Using promises for async/await
const path = require('path');
const upload = require('./uploadConfig');


const router = express.Router();

// get all userids
router.get('/userids', async (req, res) => {
    try {
        console.log('here');
        const users = await User.find({ userType: 'student' });
        const userIds =  await users.map(user => user._id);
        res.json(userIds);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});
// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// Signup
router.post('/signup', upload.single('photo'), async (req, res) => {
    console.log(req.body);
    try {
        const { fullName, email, password, age, gender, userType } = req.body;
        const photoPath = req.file ? req.file.path : null



        const user = new User({ fullName, email, password, age, gender, userType, photoPath });
        await user.save();

        const newFilename = user._id.toString() + path.extname(req.file.originalname);

        const newLocation = path.join('../frontend/public/photos/', newFilename);
        await fs.copyFile(req.file.path, newLocation);
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        // Perform login logic here
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to login' });
    }
});


// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user' });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user' });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});


module.exports = router;