import { useState, useContext } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Login = ({ handleGoogleLogIn }) => {
  const navigate = useNavigate();

  const { setUser, user } = useContext(AuthContext);

  const initialState = {
    username: "",
    password: "",
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
      const response = await axios.post("/auth/login", formData);
      setUser(response.data);
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
    localStorage.clear();
    navigate("/");
    navigate(0);
  }

  if (user) {
    return (
      <div className="logout-container">
        <div className="logout-card">
          {user.username}, are you sure you want to log out?
          <Button className="bootBtn" onClick={() => navigate("/")}>
            Go Back
          </Button>
          <Button className="bootBtn" onClick={handleLogout}>
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
        <Button className="bootBtn" variant="primary" type="submit">
          Submit
        </Button>
        or
      </Form>
      <div>
        <div
          id="gSignInWrapper"
          onClick={(e) => handleGoogleLogIn(e)}
        >
          <div id="customBtn" className="customGPlusSignIn">
            <span className="icon"></span>
            <span className="buttonText">Continue with Google</span>
          </div>
        </div>
      </div>
      <div className="navigateBtn">
        Don't have an account?
        <br />
        <Button onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </>
  );
};

export default Login;
