const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
    // Register New User Logic
    async registerUser(userData) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('Email is already registered!');
        }

        // Schema Enum Matching:
        // Recruiter হলে Admin Approval এর জন্য 'pending'
        // Candidate হলে সরাসরি 'approved'
        const recruiterStatus = userData.role === 'recruiter' ? 'pending' : 'approved';

        const user = new User({
            ...userData,
            recruiterStatus
        });

        await user.save();
        return user;
    }

    // Login Logic
    async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password!');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid email or password!');
        }

        if (!user.isActive) {
            throw new Error('Your account is deactivated. Contact Admin.');
        }

        // Recruiter Admin Approval Guard Check
        if (user.role === 'recruiter') {
            if (user.recruiterStatus === 'pending') {
                throw new Error('Your recruiter account is pending admin approval. Please wait for approval.');
            }
            if (user.recruiterStatus === 'rejected') {
                throw new Error('Your recruiter account request was rejected by Admin.');
            }
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        return { user, token };
    }
}

module.exports = new AuthService();