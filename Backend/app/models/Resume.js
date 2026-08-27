const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },
    summary: { type: String },
    
    skills: [{ type: String }],
    
    experience: [{
        company: { type: String, required: true },
        position: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, default: 'Present' },
        description: { type: String }
    }],
    
    education: [{
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        passingYear: { type: String, required: true },
        result: { type: String }
    }],
    
    projects: [{
        title: { type: String },
        link: { type: String },
        description: { type: String }
    }],
    
    certifications: [{
        title: { type: String },
        issuer: { type: String },
        year: { type: String }
    }],
    
    languages: [{ type: String }],

    references: [{
        name: { type: String },
        designation: { type: String },
        company: { type: String },
        email: { type: String },
        phone: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema); 