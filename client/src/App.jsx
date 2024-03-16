import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/users/signin-page";
import SignUp from "./pages/users/signup-page";
import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/users/landing-page";
import Home from "./pages/home";
import Workspace from "./pages/workspace";
import Profile from "./pages/profile";
import Settings from "./pages/settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/workspace" element={<Workspace/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </>
  );
}

export default App;
