const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User' },
    rollno: String,
    classname: String,
    semester: Number
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
