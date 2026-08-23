const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const adminController = require('../controllers/adminController'); // adminController ইম্পোর্ট করা হলো
const authMiddleware = require('../middlewares/authMiddleware');

// Route Protection: Recruiter or Admin Allowed
router.use(authMiddleware.isAuthenticated);
router.use(authMiddleware.authorizeRoles('recruiter', 'admin'));

// Category Route for Recruiter (Question/Assessment-এ ক্যাটাগরি লোড করার জন্য)
router.get('/categories', adminController.getCategories);

// Question Bank Routes
router.post('/questions', recruiterController.createQuestion);
router.get('/questions', recruiterController.getQuestions);

// Assessment Builder Routes
router.post('/assessments', recruiterController.createAssessment);
router.get('/assessments', recruiterController.getAssessments);
router.put('/assessments/publish/:assessmentId', recruiterController.publishAssessment);
router.get('/assessments/:assessmentId/analytics', recruiterController.getAssessmentAnalytics);
router.post('/assessments/:assessmentId/invite', recruiterController.inviteCandidate);

module.exports = router;