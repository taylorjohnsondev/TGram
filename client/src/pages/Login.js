import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "../hooks/useAxios";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
    error: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(false);

  /**
   * The function updates the state of a form data object with the value of the input field that
   * triggered the event.
   * @param e - The parameter "e" is an event object that is passed as an argument to the function
   * "handleInput". It represents the event that triggered the function, such as a user typing in an
   * input field or clicking a button.
   */
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
      await axios.post("/auth/login", formData)
    } catch (error) {
      console.log(error)
    }

    setValidated(true);
  };

  console.log(formData);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
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
  );
};

export default Login;
