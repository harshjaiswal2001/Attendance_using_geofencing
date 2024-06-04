const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendenceSchema = new Schema({
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    status: Boolean,
    startDateTime: { type: Date, default: Date.now },
    endDateTime:Date,
    attendees: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

const Attendence = mongoose.model('Attendence', attendenceSchema);
module.exports = Attendence;
