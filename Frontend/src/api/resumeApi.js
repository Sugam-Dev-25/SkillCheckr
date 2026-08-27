import API from "./axiosInstance"; // আপনার তৈরি axios instance ফাইলটি ইম্পোর্ট করুন

// ১. Get All Resumes
export const getResumes = () => API.get("/resume");

// ২. Get Single Resume by ID
export const getResumeById = (id) => API.get(`/resume/${id}`);

// ৩. Create New Resume
export const createResume = (data) => API.post("/resume", data);

// ৪. Update Resume
export const updateResume = (id, data) => API.put(`/resume/${id}`, data);

// ৫. Delete Resume
export const deleteResume = (id) => API.delete(`/resume/${id}`);

// ৬. Download Resume PDF
export const downloadResumePdf = async (id, fullName) => {
  try {
    const response = await API.get(`/resume/${id}/download`, {
      responseType: "blob", // PDF ফাইলের জন্য Blob আবশ্যক
    });

    // ব্রাউজারে অটো-ডাউনলোড ট্রিগার করা
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fullName.replace(/\s+/g, "_")}_CV.pdf`);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    alert("Failed to download PDF. Please try again later.");
  }
};
