import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
    error: "",
  };

  const [formData, setFormData] = useState(initialState);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleInput}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInput}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
