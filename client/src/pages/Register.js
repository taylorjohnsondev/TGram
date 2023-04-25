import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../hooks/useAxios";
import { API_URL } from "../configs/constants";

const Register = () => {
  const initialState = {
    email: "",
    username: "",
    password: "",
    nickname: "",
    error: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(false);

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
      await axios.post("/auth/register", formData);
    } catch (error) {
      console.log(error);
    }

    setValidated(true);
  };

  const handleGoogleLogIn = async (e) => {
    e.preventDefault();

    try {
      // Open the Google Login URL
      window.open(
        `http://localhost:3001${API_URL}/auth/google`,
        "_self"
      );
    } catch (error) {
      console.log(error);
    }
  };

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
