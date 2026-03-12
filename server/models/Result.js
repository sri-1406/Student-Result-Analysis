const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    usn: { type: String, required: true },
    studentName: { type: String },
    semester: { type: Number, required: true },
    examCycle: { type: String }, // e.g., "Jan-2026"
    subjects: [{
        code: { type: String, required: true },
        name: { type: String },
        internalMarks: { type: Number },
        externalMarks: { type: Number },
        totalMarks: { type: Number },
        grade: { type: String },
        result: { type: String }, // P, F, A
        credits: { type: Number }
    }],
    totalMarks: { type: Number },
    percentage: { type: Number },
    sgpa: { type: Number },
    status: { type: String }, // PASS, FAIL
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
