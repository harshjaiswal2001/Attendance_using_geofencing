const express = require('express');
const Attendence = require('../models/Attendence');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const router = express.Router();

// Create a new attendence
router.post('/', async (req, res) => {
    try {

        const { subject } = req.body;
        const status = true;
        const startDateTime = new Date();
        const attendees = [];

        const attendence = new Attendence({ subject, status, startDateTime, attendees });
        await attendence.save();
        res.status(201).json(attendence);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const attendences = await Attendence.find().populate('subject').populate({ path: 'attendees', populate: { path: 'UserId' } });
        res.json(attendences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/student/:id', async (req, res) => {
    try {
        const attendences = await Attendence.find().populate('subject').populate({ path: 'attendees', populate: { path: 'UserId' } });

        // Filter attendences by student ID
        const filteredAttendences = await attendences.filter((attendence) => {
            return attendence.attendees.some((attendee) => attendee.UserId.equals(req.params.id));
        });

        res.json(filteredAttendences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})


router.post('/attend', async (req, res) => {
    try {
        const { attendee } = req.body;

        const openAttendences = await Attendence.find({ status: true }).populate({
            path: 'subject',
            populate: {
                path: 'students'
            }
        });

        var marked = false
        console.log('checking')

        for (const attendence of openAttendences) {
            console.log(attendence)
            if (attendence.status) {
                console.log('checking attendence');
                console.log(attendence.subject.students)
                for (const student of attendence.subject.students) {
                    if (student.UserId.equals(attendee)) {
                        const a = await Attendence.findById(attendence._id);
                        const stud = await Student.findOne({ UserId: attendee });
                        a.attendees.push(stud._id);
                        await a.save();
                        marked = true
                    }
                }
            }
        }

        if (marked) {
            res.status(201).json({ message: 'Attendence added successfully' });

        }
        else
            res.status(400).json({ message: 'Attendence Not Marked' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// const handleEnd = (attendence) => {
//     axios.put('http://localhost:5000/attendences/' + attendence._id, {
//         status: false
//     })
//         .then((response) => {
//             console.log(response.data);
//             alert('Attendence ended successfully');
//             getAllAttendences();
//         })
//         .catch((error) => {
//             console.error(error);
//             alert('Failed to end attendence');
//         });
// }

router.put('/:id', async (req, res) => {
    try {
        const attendence = await Attendence.findById(req.params.id);
        if (!attendence) {
            res.status(404).json({ message: 'Attendence not found' });
            return;
        }
        const { status } = req.body;
        attendence.status = status;
        attendence.endDateTime = new Date();
        await attendence.save();
        res.status(200).json(attendence);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update attendence' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const attendence = await Attendence.findById(req.params.id).populate('subject');
        if (!attendence) {
            res.status(404).json({ message: 'Attendence not found' });
            return;
        }
        res.status(200).json(attendence);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get attendence' });
    }
});

module.exports = router;