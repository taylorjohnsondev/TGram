import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  username: "",
  password: "",
  nickname: "",
  error: "",
};

const Register = ({ handleGoogleLogIn }) => {
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
      toast.error(error.response.data.error);
    }

    setValidated(true);
  };

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

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
        or
      </Form>

      <div id="gSignInWrapper" onClick={(e) => handleGoogleLogIn(e)}>
        <span class="label"></span>
        <div id="customBtn" class="customGPlusSignIn">
          <span class="icon"></span>
          <span class="buttonText">Continue with Google</span>
        </div>
      </div>
    </>
  );
};

export default Register;
