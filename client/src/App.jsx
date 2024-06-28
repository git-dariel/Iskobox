import { Route, Routes } from "react-router-dom";
import FolderOpen from "./components/home/folder.open";
import CertifcateOfAuthenticity from "./components/landing-page/CertofAuthenticity/certofAuthenticitypage";
import HomePage from "./components/landing-page/Homepages/homepage";
import LaboratoryPage from "./components/landing-page/about/Laboratory/laboratorypage";
import AboutPage from "./components/landing-page/about/aboutpage";
import FacilitiesPage from "./components/landing-page/about/buildingandfacilities/facilitiespage";
import HistoryPage from "./components/landing-page/about/historypage/historypage";
import MissionVision from "./components/landing-page/about/missionvision/missionvisionpage";
import OfficeVideoPage from "./components/landing-page/about/officevideospage/officevideopage";
import { AuthProvider } from "./helpers/auth.context";
import { CommentUpdateProvider } from "./helpers/comment.context";
import ProtectedRoute from "./helpers/protected-routes";
import { UpdateProvider } from "./helpers/update.context";
import ExhibitPage from "./pages/accreditors/accreditor.pages/exhibit.page";
import DashboardCompleted from "./pages/admin/dashboard.completed.file";
import DashboardPending from "./pages/admin/dashboard.pending.file";
import FolderPage from "./pages/admin/folder-page";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import LandingPage from "./pages/users/landing-page";
import SignIn from "./pages/users/signin-page";
import SignUp from "./pages/users/signup-page";
import Workspace from "./pages/workspace";
import ProgramsUnderSurvey from "./pages/accreditors/accreditor.pages/programs.under.survey";
import BSIT from "./pages/accreditors/accreditor.pages/PUS-BSIT";
import FacultyManual from "./pages/accreditors/accreditor.pages/exhibit/faculty.manual";
import CitizensCharter from "./pages/accreditors/accreditor.pages/exhibit/citizens.charter.page";
import StudentHandbook from "./pages/accreditors/accreditor.pages/exhibit/student.handbook";
import UniversityCode from "./pages/accreditors/accreditor.pages/exhibit/university.code";
import UnivPoliciesGuidelines from "./pages/accreditors/accreditor.pages/exhibit/univ.policies";
import AdminManual from "./pages/accreditors/accreditor.pages/exhibit/admin.manual";
import Syllabi from "./pages/accreditors/accreditor.pages/exhibit/syllabi";
import InstructionalMaterials from "./pages/accreditors/accreditor.pages/exhibit/instructional.mats";
import CMOpage from "./pages/accreditors/accreditor.pages/exhibit/cmo";
import AreaOne from "./pages/accreditors/accreditor.pages/areas/area.one";
import AreaTwo from "./pages/accreditors/accreditor.pages/areas/area.two";
import AreaThree from "./pages/accreditors/accreditor.pages/areas/area.three";
import AreaFour from "./pages/accreditors/accreditor.pages/areas/area.four";
import AreaFive from "./pages/accreditors/accreditor.pages/areas/area.five";
import AreaSix from "./pages/accreditors/accreditor.pages/areas/area.six";
import AreaSeven from "./pages/accreditors/accreditor.pages/areas/area.seven";
import AreaEight from "./pages/accreditors/accreditor.pages/areas/area.eight";
import AreaNine from "./pages/accreditors/accreditor.pages/areas/area.nine";
import AreaTen from "./pages/accreditors/accreditor.pages/areas/area.ten";

function App() {
  return (
    <AuthProvider>
      <UpdateProvider>
        <CommentUpdateProvider>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/folder-page" element={<FolderPage />} />
            <Route path="/landingpage" element={<LandingPage />} />
            {/* Exhibit Routes */}
            <Route path="/exhibit" element={<ExhibitPage />} />
            <Route path="/exhibit/citizens-charter" element={<CitizensCharter />} />
            <Route path="/exhibit/student-handbook" element={<StudentHandbook />} />
            <Route path="/exhibit/university-code" element={<UniversityCode />} />
            <Route
              path="/exhibit/university-policies-guidelines"
              element={<UnivPoliciesGuidelines />}
            />
            <Route path="/exhibit/faculty-manual" element={<FacultyManual />} />
            <Route path="/exhibit/administrative-manual" element={<AdminManual />} />
            <Route path="/exhibit/syllabi" element={<Syllabi />} />
            <Route path="/exhibit/instructional-materials" element={<InstructionalMaterials />} />
            <Route path="/exhibit/cmo" element={<CMOpage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-pending"
              element={
                <ProtectedRoute>
                  <DashboardPending />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-completed"
              element={
                <ProtectedRoute>
                  <DashboardCompleted />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ticket"
              element={
                <ProtectedRoute>
                  <Workspace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/folders/:folderId"
              element={
                <ProtectedRoute>
                  <FolderOpen />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutpage" element={<AboutPage />} />
            <Route path="/historypage" element={<HistoryPage />} />
            <Route path="/missionvisionpage" element={<MissionVision />} />
            <Route path="/facilitiespage" element={<FacilitiesPage />} />
            <Route path="/laboratorypage" element={<LaboratoryPage />} />
            <Route path="/officesvideopage" element={<OfficeVideoPage />} />
            <Route path="/certificate-of-authenticitypage" element={<CertifcateOfAuthenticity />} />
            {/* Programs Under Survey */}
            <Route path="/programs-under-survey" element={<ProgramsUnderSurvey />} />
            <Route path="/programs-under-survey/bsit" element={<BSIT />} />
            <Route path="/programs-under-survey/areaone" element={<AreaOne />} />
            <Route path="/programs-under-survey/areatwo" element={<AreaTwo />} />
            <Route path="/programs-under-survey/areathree" element={<AreaThree />} />
            <Route path="/programs-under-survey/areafour" element={<AreaFour />} />
            <Route path="/programs-under-survey/areafive" element={<AreaFive />} />
            <Route path="/programs-under-survey/areasix" element={<AreaSix />} />
            <Route path="/programs-under-survey/areaseven" element={<AreaSeven />} />
            <Route path="/programs-under-survey/areaeight" element={<AreaEight />} />
            <Route path="/programs-under-survey/areanine" element={<AreaNine />} />
            <Route path="/programs-under-survey/areaten" element={<AreaTen />} />
          </Routes>
        </CommentUpdateProvider>
      </UpdateProvider>
    </AuthProvider>
  );
}

export default App;
