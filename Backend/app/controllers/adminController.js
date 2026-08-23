const User = require("../models/User");
const Category = require("../models/Category");
const Assessment = require("../models/Assessment");

class AdminController {
  constructor() {
    this.createCategory = this.createCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.toggleCategoryStatus = this.toggleCategoryStatus.bind(this);
    this.getPendingRecruiters = this.getPendingRecruiters.bind(this);
    this.approveRecruiter = this.approveRecruiter.bind(this);
    this.getAdminStats = this.getAdminStats.bind(this);
  }

  // Create Category API
  async createCategory(req, res) {
    try {
      const { name, description, type } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Category name is required!",
        });
      }

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category with this name already exists!",
        });
      }

      // type না পাঠালে ডিফল্ট 'technical' সেট হবে (Schema enum অনুযায়ী)
      const category = new Category({
        name,
        description: description || "",
        type: type || "technical",
        status: "active",
      });
      await category.save();

      return res.status(201).json({
        success: true,
        message: "Category created successfully!",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get All Categories API (Admin gets all, Recruiter gets active ones)
  async getCategories(req, res) {
    try {
      // Admin হলে সব দেখাবে, অন্যথায় কেবল active ক্যাটাগরি দেখাবে
      const filter =
        req.user && req.user.role === "admin" ? {} : { status: "active" };
      const categories = await Category.find(filter);

      return res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Toggle Category Status (Active <-> Inactive) API
  async toggleCategoryStatus(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found!",
        });
      }

      category.status = category.status === "active" ? "inactive" : "active";
      await category.save();

      return res.status(200).json({
        success: true,
        message: `Category status updated to ${category.status}`,
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get Pending Recruiters List API
  async getPendingRecruiters(req, res) {
    try {
      const pendingRecruiters = await User.find({
        role: "recruiter",
        recruiterStatus: "pending",
      }).select("-password");

      return res.status(200).json({
        success: true,
        count: pendingRecruiters.length,
        data: pendingRecruiters,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Approve or Reject Recruiter Account API
  async approveRecruiter(req, res) {
    try {
      const { recruiterId } = req.params;
      const { status } = req.body;

      if (!status || !["approved", "rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Valid status (approved or rejected) is required!",
        });
      }

      const recruiter = await User.findById(recruiterId);
      if (!recruiter || recruiter.role !== "recruiter") {
        return res.status(404).json({
          success: false,
          message: "Recruiter not found!",
        });
      }

      recruiter.recruiterStatus = status;
      await recruiter.save();

      return res.status(200).json({
        success: true,
        message: `Recruiter account ${status} successfully!`,
        data: {
          id: recruiter._id,
          name: recruiter.name,
          email: recruiter.email,
          recruiterStatus: recruiter.recruiterStatus,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get Admin Dashboard Stats API
  async getAdminStats(req, res) {
    try {
      const totalUsers = await User.countDocuments();
      const pendingRecruiters = await User.countDocuments({
        role: "recruiter",
        recruiterStatus: "pending",
      });
      const totalAssessments = await Assessment.countDocuments();

      return res.status(200).json({
        success: true,
        data: {
          totalUsers,
          pendingRecruiters,
          totalAssessments,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AdminController();
