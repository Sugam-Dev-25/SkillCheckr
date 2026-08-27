const Resume = require('../models/Resume');
const cvPdfService = require('../services/resumePdfService');

class resumeController {
    // ১. Create New CV
    async createCv(req, res) {
        try {
            const newCv = new Resume({ ...req.body });
            await newCv.save();
            res.status(201).json({ success: true, message: "CV created successfully", data: newCv });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // ২. Get All CVs
    async getAllCvs(req, res) {
        try {
            const cvs = await Resume.find().sort({ createdAt: -1 });
            res.status(200).json({ success: true, data: cvs });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // ৩. Get Single CV by ID
    async getCvById(req, res) {
        try {
            const cv = await Resume.findById(req.params.id);
            if (!cv) return res.status(404).json({ success: false, message: "CV not found" });
            res.status(200).json({ success: true, data: cv });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // ৪. Update CV by ID
    async updateCv(req, res) {
        try {
            const updatedCv = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCv) return res.status(404).json({ success: false, message: "CV not found" });
            res.status(200).json({ success: true, message: "CV updated successfully", data: updatedCv });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // ৫. Delete CV by ID
    async deleteCv(req, res) {
        try {
            const deletedCv = await Resume.findByIdAndDelete(req.params.id);
            if (!deletedCv) return res.status(404).json({ success: false, message: "CV not found" });
            res.status(200).json({ success: true, message: "CV deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // ৬. Download CV PDF
    async downloadCvPdf(req, res) {
        try {
            const cv = await Resume.findById(req.params.id);
            if (!cv) return res.status(404).json({ success: false, message: "CV not found" });

            const pdfBuffer = await cvPdfService.generateCvPdf(cv);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${cv.fullName.replace(/\s+/g, '_')}_CV.pdf`);
            res.send(pdfBuffer);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new resumeController();