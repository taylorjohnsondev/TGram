import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
      </Routes>

      <Navbar />
    </>
  );
}

export default App;
