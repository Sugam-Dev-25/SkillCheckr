import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResumes, deleteResume, downloadResumePdf } from '../../api/resumeApi';

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const res = await getResumes();
            setResumes(res.data.data);
        } catch (error) {
            console.error('Error fetching resumes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchResumes(); 
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this CV?')) {
            await deleteResume(id);
            fetchResumes();
        }
    };

    return (
        <div className="max-w-5xl mx-auto my-10 p-4">
            {/* Header Area */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">My Resumes</h1>
                    <p className="text-sm text-slate-400 mt-1">Manage, edit, or download your saved CVs.</p>
                </div>
                <button 
                    onClick={() => navigate('/resume/create')} 
                    className="bg-[#1a65fe] hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 text-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create CV</span>
                </button>
            </div>
            
            {/* Content Area */}
            {loading ? (
                <div className="text-center py-12 text-slate-400 font-medium">Loading resumes...</div>
            ) : resumes.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <p className="text-slate-500 font-medium mb-4">No resumes created yet.</p>
                    <button 
                        onClick={() => navigate('/resume/create')}
                        className="text-[#1a65fe] hover:underline font-semibold text-sm"
                    >
                        + Create your first resume
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {resumes.map((cv) => (
                        <div key={cv._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{cv.fullName}</h3>
                                <p className="text-sm font-medium text-slate-500 mt-0.5">{cv.jobTitle}</p>
                                {cv.email && (
                                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {cv.email}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                <button 
                                    onClick={() => downloadResumePdf(cv._id, cv.fullName)} 
                                    className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    PDF
                                </button>

                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => navigate(`/resume/edit/${cv._id}`)} 
                                        className="bg-blue-50 text-[#1a65fe] hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(cv._id)} 
                                        className="bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResumeList;