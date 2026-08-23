import API from './axiosInstance';

export const getPublicAssessments = () => API.get('/candidate/assessments');
export const startExam = (assessmentId) => API.get(`/candidate/assessments/start/${assessmentId}`);
export const submitExam = (assessmentId, answers) => API.post(`/candidate/assessments/submit/${assessmentId}`, answers);
export const getMyResults = () => API.get('/candidate/results');
export const downloadCertificate = (attemptId) => API.get(`/candidate/certificate/download/${attemptId}`, { responseType: 'blob' });