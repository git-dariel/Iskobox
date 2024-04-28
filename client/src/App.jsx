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

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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
          path="/workspace"
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
      </Routes>
    </AuthProvider>
  );
}

export default App;
