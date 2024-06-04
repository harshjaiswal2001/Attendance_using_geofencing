const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
