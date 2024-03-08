import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/users/signin-page";
import SignUp from "./pages/users/signup-page";
import Dashboard from "./pages/admin/dashboard-page";
import LandingPage from "./pages/users/landing-page";
import Home from "./pages/for-testing/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
