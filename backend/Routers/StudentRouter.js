const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Create a new student
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { UserId, rollno, classname, semester } = req.body;
        const student = new Student(
            { UserId, rollno, classname, semester }
        );
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('UserId');
        console.log(students);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a student by ID
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;