import API from './axiosInstance';

export const getAdminStats = () => API.get('/admin/stats');
export const getPendingRecruiters = () => API.get('/admin/recruiters/pending');

// Recruiter Approve/Reject Route
export const updateRecruiterStatus = (id, status) => 
  API.put(`/admin/recruiters/approve/${id}`, { status });

// Category Routes
export const getCategories = () => API.get('/admin/categories');
export const createCategory = (data) => API.post('/admin/categories', data);
export const toggleCategoryStatus = (id) => API.put(`/admin/categories/${id}/toggle`);