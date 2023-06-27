import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import AvatarEditor from "../components/Avatar/AvatarEditor";
import axios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  nickname: "",
  error: "",
  touched: false,
};

const Register = ({ handleGoogleLogIn }) => {
  const [formValues, setFormValues] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [avatar, setAvatar] = useState("");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
      touched: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password, confirmPassword } = formValues;

    if (password !== confirmPassword) {
      return setFormValues({
        ...formValues,
        error: "Passwords must match.",
      });
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    formData.append("file", avatar);

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
      <AvatarEditor storedUser={null} setAvatar={setAvatar} />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            name="email"
            value={formValues.email}
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
            value={formValues.username}
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
            isInvalid={formValues.password.length < 7}
            value={formValues.password}
            autoComplete="new-password"
            onChange={handleInput}
          />
          {formValues.password.length < 7 &&
          formValues.password !== "" ? (
            <Form.Control.Feedback type="invalid">
              Password must be at least 7 characters.
            </Form.Control.Feedback>
          ) : (
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="confirmFormBasicPassword"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            isValid={
              formValues.confirmPassword === formValues.password &&
              formValues.touched
            }
            isInvalid={
              formValues.confirmPassword !== formValues.password &&
              formValues.confirmPassword !== "" &&
              formValues.touched
            }
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            autoComplete="new-password"
            onChange={handleInput}
          />
          {formValues.confirmPassword !== formValues.password &&
          formValues.confirmPassword !== "" ? (
            <Form.Control.Feedback type="invalid">
              Passwords don't match.
            </Form.Control.Feedback>
          ) : (
            <Form.Control.Feedback type="invalid">
              Please confirm your password.
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        or
      </Form>

      <div id="gSignInWrapper" onClick={(e) => handleGoogleLogIn(e)}>
        <span className="label"></span>
        <div id="customBtn" className="customGPlusSignIn">
          <span className="icon"></span>
          <span className="buttonText">Continue with Google</span>
        </div>
      </div>
    </>
  );
};

export default Register;
