import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import GoogleSuccess from "./pages/GoogleSuccess";
import Logo from "./components/Logo";
import { Route, Routes } from "react-router-dom";
import { API_URL } from "./configs/constants";
import { ToastContainer, toast } from "react-toastify";
import EditProfile from "./pages/EditProfile";
import "react-toastify/dist/ReactToastify.css";
import Following from "./components/Following";

function App() {
  /**
   * This function handles the Google login process by opening a new window and checking if it has been
   * closed to authenticate the user and fetch their information.
   * @param e - The "e" parameter is an event object that is passed to the function when it is
   * triggered by an event, such as a button click or form submission. In this case, it is used to
   * prevent the default behavior of the event, which is to reload the page when a form is submitted.
   */
  const handleGoogleLogIn = async (e) => {
    e.preventDefault();

    try {
      // Redirect the user to the Google Login URL
      window.location.href = `http://localhost:3001${API_URL}/auth/google`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Logo />
      {/* https://fkhadra.github.io/react-toastify/introduction/ */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {/* Normal Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/following" element={<Following />} /> 

        <Route
          path="login"
          element={<Login handleGoogleLogIn={handleGoogleLogIn} />}
        />
        <Route
          path="register"
          element={<Register handleGoogleLogIn={handleGoogleLogIn} />}
        />
        <Route path="googleSuccess" element={<GoogleSuccess />} />

        {/* We need to protect these routes */}
        <Route path="/users/:_id" element={<Profile />} />
        <Route path="/users/:_id/edit" element={<EditProfile />} />
      </Routes>

      <Navbar />
    </>
  );
}

export default App;
