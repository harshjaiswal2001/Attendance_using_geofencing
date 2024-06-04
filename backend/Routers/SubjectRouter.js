const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Create a new Subject
router.post('/', async (req, res) => {
    try {

        const { name, teacher } = req.body;
        const subject = new Subject({ name, teacher, students: [] });
        await subject.save();
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a single Subject by ID
router.get('/teacher/:id', async (req, res) => {
    try {
        const subjects = await Subject.find({ teacher: req.params.id })
            .populate('teacher')  // Populate the teacher details
            .populate({
                path: 'students',  // Path to populate
                populate: {
                    path: 'UserId',  // Nested path within students to further populate
                    model: 'User'  // Assuming 'User' is the model name for the UserId reference
                }
            });
        if (!subjects || subjects.length === 0) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Subject by ID
router.put('/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Subject by ID
router.delete('/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndRemove(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// axios.post(`http://localhost:5000/subjects/${selectedSubject._id}/students`, {
//             student: student
//         })

router.post('/:id/students', async (req, res) => {
    try {
        const { student } = req.body;
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        subject.students.push(student);
        await subject.save();
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// axios.delete(`http://localhost:5000/subjects/${selectedSubject._id}/students/${id}`)

router.delete('/:id/students/:studentId', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        subject.students = subject.students.filter((student) => student.toString() !== req.params.studentId);
        // remove req.params.studentId from students

        await subject.save();
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
