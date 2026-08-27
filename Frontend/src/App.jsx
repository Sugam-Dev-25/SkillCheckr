import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

// Public Pages
import HomeComponents from "./pages/home/HomeComponents";
import BenefitsComponents from "./pages/benefits/BenefitsComponents";
import AboutComponents from "./pages/about/AboutComponents";
import ContactComponents from "./pages/contact/ContactComponents";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingRecruiters from "./pages/admin/PendingRecruiters";
import Categories from "./pages/admin/Categories";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import QuestionBank from "./pages/recruiter/QuestionBank";
import CreateAssessment from "./pages/recruiter/CreateAssessment";
import AssessmentAnalytics from "./pages/recruiter/AssessmentAnalytics";

// Candidate Pages
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import AssessmentList from "./pages/candidate/AssessmentList";
import ExamScreen from "./pages/candidate/ExamScreen";
import ResultScreen from "./pages/candidate/ResultScreen";
import Unauthorized from "./pages/Unauthorized";
import Footer from "./components/common/Footer";
import ResumeForm from "./pages/resume/ResumeForm";
import ResumeList from "./pages/resume/ResumeList";

function AppLayout() {
  const { user } = useAuth();
  const location = useLocation();

  // শুধু অ্যাডমিন, রিক্রুটার এবং ক্যান্ডিডেট রাউটে সাইডবার দেখাবে (পাবলিক পেজে নয়)
  const isDashboardRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/recruiter") ||
    location.pathname.startsWith("/candidate");

  const showSidebar = user && isDashboardRoute;

  return (
    <div className="flex">
      {/* শুধু নির্দিষ্ট ড্যাশবোর্ড পেজেই সাইডবার রেন্ডার হবে */}
      {showSidebar && <Sidebar />}

      <main className="flex-1 min-h-[calc(100vh-64px)] bg-slate-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeComponents />} />
          <Route path="/what-benefits" element={<BenefitsComponents />} />
          <Route path="/about" element={<AboutComponents />} />
          <Route path="/contact" element={<ContactComponents />} />

          <Route path="/resume" element={<ResumeList />} />
          <Route path="/resume/create" element={<ResumeForm />} />
          <Route path="/resume/edit/:selectedId" element={<ResumeForm />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/recruiters" element={<PendingRecruiters />} />
            <Route path="/admin/categories" element={<Categories />} />
          </Route>

          {/* Recruiter Protected Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={["recruiter", "admin"]} />}
          >
            <Route
              path="/recruiter/dashboard"
              element={<RecruiterDashboard />}
            />
            <Route path="/recruiter/questions" element={<QuestionBank />} />
            <Route
              path="/recruiter/create-assessment"
              element={<CreateAssessment />}
            />
            <Route
              path="/recruiter/analytics/:id"
              element={<AssessmentAnalytics />}
            />
          </Route>

          {/* Candidate Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["candidate"]} />}>
            <Route
              path="/candidate/dashboard"
              element={<CandidateDashboard />}
            />
            <Route path="/candidate/assessments" element={<AssessmentList />} />
            <Route path="/candidate/results" element={<ResultScreen />} />
            <Route
              path="/assessment/start/:assessmentId"
              element={<ExamScreen />}
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppLayout />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
