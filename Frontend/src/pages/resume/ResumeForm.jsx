import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createResume, updateResume, getResumeById } from '../../api/resumeApi';

const ResumeForm = () => {
    const navigate = useNavigate();
    const { selectedId } = useParams();

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            fullName: '', jobTitle: '', email: '', phone: '',
            address: '', website: '', linkedin: '', github: '',
            summary: '', skills: '', languages: '',
            experience: [{ company: '', position: '', startDate: '', endDate: 'Present', description: '' }],
            education: [{ institution: '', degree: '', passingYear: '', result: '' }],
            projects: [{ title: '', link: '', description: '' }],
            certifications: [{ title: '', issuer: '', year: '' }],
            references: [{ name: '', designation: '', company: '', email: '', phone: '' }]
        }
    });

    // Dynamic Field Arrays
    const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' });
    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
    const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: 'projects' });
    const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control, name: 'certifications' });
    const { fields: refFields, append: appendRef, remove: removeRef } = useFieldArray({ control, name: 'references' });

    useEffect(() => {
        if (selectedId) {
            getResumeById(selectedId).then(res => {
                const data = res.data.data;
                reset({
                    ...data,
                    skills: Array.isArray(data.skills) ? data.skills.join(', ') : data.skills,
                    languages: Array.isArray(data.languages) ? data.languages.join(', ') : data.languages
                });
            });
        }
    }, [selectedId, reset]);

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            skills: typeof data.skills === 'string' ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : data.skills,
            languages: typeof data.languages === 'string' ? data.languages.split(',').map(l => l.trim()).filter(Boolean) : data.languages
        };

        try {
            if (selectedId) {
                await updateResume(selectedId, payload);
            } else {
                await createResume(payload);
            }
            navigate('/resume');
        } catch (error) {
            console.error('Error saving CV:', error);
        }
    };

    // Styling constant matching the uploaded image design
    const inputStyle = "w-full bg-[#f8fafc] border border-slate-200 text-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition text-sm font-medium";
    const labelStyle = "block text-xs font-semibold text-slate-600 mb-1.5";

    return (
        <div className="max-w-4xl mx-auto my-10 p-2">
            <button 
                onClick={() => navigate('/resume')} 
                className="mb-6 text-sm font-semibold text-slate-500 hover:text-blue-600 transition flex items-center gap-1"
            >
                ← Back to Resumes
            </button>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-xl space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        {selectedId ? 'Edit Resume' : 'Create Resume'}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">Fill out the details below to generate your professional CV.</p>
                </div>

                {/* 1. Basic & Contact Information */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-700 border-b pb-2">Personal & Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>Full Name *</label>
                            <input type="text" placeholder="John Doe" {...register('fullName', { required: true })} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Job Title *</label>
                            <input type="text" placeholder="Software Engineer" {...register('jobTitle', { required: true })} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Email *</label>
                            <input type="email" placeholder="name@example.com" {...register('email', { required: true })} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Phone *</label>
                            <input type="text" placeholder="+880 1700-000000" {...register('phone', { required: true })} className={inputStyle} />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelStyle}>Address</label>
                            <input type="text" placeholder="Dhaka, Bangladesh" {...register('address')} className={inputStyle} />
                        </div>
                    </div>
                </div>

                {/* 2. Web Links */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-700 border-b pb-2">Online Profiles & Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className={labelStyle}>Website / Portfolio</label>
                            <input type="url" placeholder="https://mywebsite.com" {...register('website')} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>LinkedIn</label>
                            <input type="url" placeholder="https://linkedin.com/in/username" {...register('linkedin')} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>GitHub</label>
                            <input type="url" placeholder="https://github.com/username" {...register('github')} className={inputStyle} />
                        </div>
                    </div>
                </div>

                {/* 3. Summary, Skills & Languages */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-700 border-b pb-2">Summary, Skills & Languages</h3>
                    <div>
                        <label className={labelStyle}>Professional Summary</label>
                        <textarea rows="3" placeholder="Write a short overview of your career..." {...register('summary')} className={inputStyle} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>Skills (Comma Separated)</label>
                            <input type="text" placeholder="JavaScript, React, Node.js, MongoDB" {...register('skills')} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Languages (Comma Separated)</label>
                            <input type="text" placeholder="English, Bengali" {...register('languages')} className={inputStyle} />
                        </div>
                    </div>
                </div>

                {/* 4. Experience Section */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-700 border-b pb-2">Work Experience</h3>
                    {expFields.map((field, index) => (
                        <div key={field.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelStyle}>Company *</label>
                                    <input placeholder="Google" {...register(`experience.${index}.company`, { required: true })} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Position *</label>
                                    <input placeholder="Frontend Developer" {...register(`experience.${index}.position`, { required: true })} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Start Date *</label>
                                    <input placeholder="Jan 2022" {...register(`experience.${index}.startDate`, { required: true })} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>End Date</label>
                                    <input placeholder="Present / Dec 2023" {...register(`experience.${index}.endDate`)} className={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Description</label>
                                <textarea rows="2" placeholder="Responsibilities and achievements..." {...register(`experience.${index}.description`)} className={inputStyle} />
                            </div>
                            {expFields.length > 1 && (
                                <button type="button" onClick={() => removeExp(index)} className="text-xs font-semibold text-red-500 hover:underline">
                                    - Remove Experience
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => appendExp({ company: '', position: '', startDate: '', endDate: 'Present', description: '' })} className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                        + Add Experience
                    </button>
                </div>

                {/* 5. Education Section */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-700 border-b pb-2">Education</h3>
                    {eduFields.map((field, index) => (
                        <div key={field.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelStyle}>Institution *</label>
                                    <input placeholder="Dhaka University" {...register(`education.${index}.institution`, { required: true })} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Degree *</label>
                                    <input placeholder="B.Sc in CSE" {...register(`education.${index}.degree`, { required: true })} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Passing Year *</label>
                                    <input placeholder="2023" {...register(`education.${index}.passingYear`, { required: true })} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Result / CGPA</label>
                                    <input placeholder="3.80 out of 4.00" {...register(`education.${index}.result`)} className={inputStyle} />
                                </div>
                            </div>
                            {eduFields.length > 1 && (
                                <button type="button" onClick={() => removeEdu(index)} className="text-xs font-semibold text-red-500 hover:underline">
                                    - Remove Education
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => appendEdu({ institution: '', degree: '', passingYear: '', result: '' })} className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                        + Add Education
                    </button>
                </div>

                {/* 6. Projects Section */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-700 border-b pb-2">Projects</h3>
                    {projFields.map((field, index) => (
                        <div key={field.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelStyle}>Project Title</label>
                                    <input placeholder="E-commerce App" {...register(`projects.${index}.title`)} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Project Link</label>
                                    <input placeholder="https://project.com" {...register(`projects.${index}.link`)} className={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Description</label>
                                <textarea rows="2" placeholder="Key features built..." {...register(`projects.${index}.description`)} className={inputStyle} />
                            </div>
                            <button type="button" onClick={() => removeProj(index)} className="text-xs font-semibold text-red-500 hover:underline">
                                - Remove Project
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendProj({ title: '', link: '', description: '' })} className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                        + Add Project
                    </button>
                </div>

                {/* 7. Certifications Section */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-700 border-b pb-2">Certifications</h3>
                    {certFields.map((field, index) => (
                        <div key={field.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className={labelStyle}>Certification Title</label>
                                    <input placeholder="AWS Certified Developer" {...register(`certifications.${index}.title`)} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Issuer</label>
                                    <input placeholder="Amazon Web Services" {...register(`certifications.${index}.issuer`)} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Year</label>
                                    <input placeholder="2023" {...register(`certifications.${index}.year`)} className={inputStyle} />
                                </div>
                            </div>
                            <button type="button" onClick={() => removeCert(index)} className="text-xs font-semibold text-red-500 hover:underline">
                                - Remove Certification
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendCert({ title: '', issuer: '', year: '' })} className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                        + Add Certification
                    </button>
                </div>

                {/* 8. References Section */}
                <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-700 border-b pb-2">References</h3>
                    {refFields.map((field, index) => (
                        <div key={field.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelStyle}>Reference Name</label>
                                    <input placeholder="Jane Smith" {...register(`references.${index}.name`)} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Designation</label>
                                    <input placeholder="Team Lead" {...register(`references.${index}.designation`)} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Company</label>
                                    <input placeholder="Tech Corp" {...register(`references.${index}.company`)} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Email</label>
                                    <input placeholder="jane@techcorp.com" {...register(`references.${index}.email`)} className={inputStyle} />
                                </div>
                            </div>
                            <button type="button" onClick={() => removeRef(index)} className="text-xs font-semibold text-red-500 hover:underline">
                                - Remove Reference
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendRef({ name: '', designation: '', company: '', email: '', phone: '' })} className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                        + Add Reference
                    </button>
                </div>

                {/* Submit Button matching the exact design of image */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="w-full bg-[#1a65fe] hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-base"
                    >
                        <span>{selectedId ? 'Update Resume' : 'Save Resume'}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResumeForm;