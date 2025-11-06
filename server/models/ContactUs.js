// models/ContactUs.js
const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    message: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    countrycode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: {
        type: Date
    }
});

// Index for faster queries
contactUsSchema.index({ email: 1, status: 1 });

module.exports = mongoose.model('ContactUs', contactUsSchema);