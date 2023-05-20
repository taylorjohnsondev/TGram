import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleGoogleLogIn }) => {
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
    error: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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
      const response = await axios.post("api/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      navigate(0);
    } catch (error) {
      console.log(error);
    }

    setValidated(true);
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/");
    navigate(0);
  }

  if (user) {
    return (
      <div className="logout-container">
        <div className="logout-card">
          @{user.username}, are you sure you want to log out?
          <br />
          <Button className="logout-btn" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">
              @
            </InputGroup.Text>
            <Form.Control
              required
              type="text"
              name="username"
              value={formData.username}
              aria-describedby="inputGroupPrepend"
              placeholder="Enter username"
              autoComplete="username"
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your username.
            </Form.Control.Feedback>
          </InputGroup>
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
      <br />
      Don't have an account?
      <br />
      <Button onClick={() => navigate("/register")}>
        Register here
      </Button>
      <div>
        or{" "}
        <div
          id="gSignInWrapper"
          onClick={(e) => handleGoogleLogIn(e)}
        >
          <span class="label">Sign in with:</span>
          <div id="customBtn" class="customGPlusSignIn">
            <span class="icon"></span>
            <span class="buttonText">Google</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
