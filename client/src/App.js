import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import GoogleSuccess from "./pages/GoogleSuccess";
import Logo from "./components/Logo";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Logo />

      <Routes>
        {/* Normal Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="googleSuccess" element={<GoogleSuccess />} />
 
        {/* We need to protect these routes */}
        <Route path="/users/:_id" element={<Profile />} />
      </Routes>

      <Navbar />
    </>
  );
}

export default App;
