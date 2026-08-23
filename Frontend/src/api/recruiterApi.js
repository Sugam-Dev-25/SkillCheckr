import API from './axiosInstance';

// Categories API for Recruiter
export const getRecruiterCategories = () => API.get('/recruiter/categories');

// Question Bank APIs
export const getQuestions = () => API.get('/recruiter/questions');
export const createQuestion = (data) => API.post('/recruiter/questions', data);

// Assessment Builder APIs
export const getAssessments = () => API.get('/recruiter/assessments');
export const createAssessment = (data) => API.post('/recruiter/assessments', data);
export const publishAssessment = (id) => API.put(`/recruiter/assessments/publish/${id}`);
export const inviteCandidate = (assessmentId, data) => API.post(`/recruiter/assessments/${assessmentId}/invite`, data);
export const getAssessmentAnalytics = (id) => API.get(`/recruiter/assessments/${id}/analytics`);