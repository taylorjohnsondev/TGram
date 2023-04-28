import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../configs/constants";

const initialState = {
  email: "",
  username: "",
  password: "",
  nickname: "",
  error: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      const response = await axios.post("/auth/register", formData); //the base url already contains /api
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      navigate(0);
    } catch (error) {
      console.log(error);
    }

    setValidated(true);
  };

  /**
   * This function fetches the authenticated Google user's data and stores it in local storage.
   */
  const fetchGoogleUser = async () => {
    const response = await axios
      .get("/auth/user", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated.");
        console.log(err);
      });

    if (response && response.data) {
      setUser(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      navigate(0);
    }
  };

  /**
   * This function handles the Google login process by opening a new window and checking if it has been
   * closed to authenticate the user and fetch their information.
   * @param e - The "e" parameter is an event object that is passed to the function when it is
   * triggered by an event, such as a button click or form submission. In this case, it is used to
   * prevent the default behavior of the event, which is to reload the page when a form is submitted.
   */
  const handleGoogleLogIn = async (e) => {
    e.preventDefault();
    let timer;

    try {
      // Open the Google Login URL
      const newWindow = window.open(
        `http://localhost:3001${API_URL}/auth/google`,
        "_blank",
        "width=500,height=600"
      );

      if (newWindow) {
        timer = setInterval(() => {
          if (newWindow.closed) {
            console.log("Authenticated with Google");
            fetchGoogleUser();

            if (timer) {
              clearInterval(timer);
            }
          }
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/");
    navigate(0);
  }

  if (user) {
    return (
      <div>
        @{user.username}, you are already registered.
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    );
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Register</h1>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            autoComplete="email"
            onChange={handleInput}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            value={formData.username}
            placeholder="Enter username"
            autoComplete="username"
            onChange={handleInput}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            autoComplete="current-password"
            onChange={handleInput}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      Or use Google{" "}
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => handleGoogleLogIn(e)}
      >
        Sign in with Google
      </Button>
    </>
  );
};

export default Register;
