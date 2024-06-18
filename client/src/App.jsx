import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./helpers/auth.context";
import ProtectedRoute from "./helpers/protected-routes";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import SignIn from "./pages/users/signin-page";
import SignUp from "./pages/users/signup-page";
import Workspace from "./pages/workspace";
import FolderOpen from "./components/home/folder.open";
import FolderPage from "./pages/admin/folder-page";
import { UpdateProvider } from "./helpers/update.context";
import { CommentUpdateProvider } from "./helpers/comment.context";
import LandingPage from "./pages/users/landing-page";
import ExhibitPage from "./pages/accreditors/accreditor.pages/exhibit.page";
import HomePage from "./components/landing-page/Homepages/homepage";
import AboutPage from "./components/landing-page/about/aboutpage";
import HistoryPage from "./components/landing-page/about/historypage/historypage";
import MissionVision from "./components/landing-page/about/missionvision/missionvisionpage";
import LaboratoryPage from "./components/landing-page/about/Laboratory/laboratorypage";
import OfficeVideoPage from "./components/landing-page/about/officevideospage/officevideopage";
import CertifcateOfAuthenticity from "./components/landing-page/CertofAuthenticity/certofAuthenticitypage";

function App() {
  return (
    <AuthProvider>
      <UpdateProvider>
        <CommentUpdateProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/folder-page" element={<FolderPage />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/pup-lq-accreditation" element={<ExhibitPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
            //Landing Page
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/aboutpage" element={<AboutPage />} />
            <Route path="/historypage" element={<HistoryPage/>} />
            <Route path="/missionvisionpage" element={<MissionVision/>} />
            <Route path="/laboratorypage" element={<LaboratoryPage/>} />
            <Route path="/officesvideopage" element={<OfficeVideoPage/>} />
            <Route path="/certificate-of-authenticitypage" element={<CertifcateOfAuthenticity/>} />
          </Routes>
        </CommentUpdateProvider>
      </UpdateProvider>
    </AuthProvider>
  );
}

export default App;
