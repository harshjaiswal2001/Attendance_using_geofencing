const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
const userRouter = require('./Routers/UserRouter');
app.use('/users', userRouter);

const studentRouter = require('./Routers/StudentRouter');
app.use('/students', studentRouter);

const subjectRouter = require('./Routers/SubjectRouter');
app.use('/subjects', subjectRouter);

const attendenceRouter = require('./Routers/AttendenceRouter');
app.use('/attendences', attendenceRouter);


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/geofencing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });