import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import AvatarEditor from "../components/Avatar/AvatarEditor";

const EditProfile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setUser } = useContext(AuthContext);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUser() {
      const userData = await axiosPrivate.get(`/users/${params._id}`);
      setUser(userData.data);
      setFormData({ username: userData.data.username });
      if (params._id !== storedUser._id) {
        navigate("/");
      }
    }
    fetchUser();
  }, [params._id]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // This route requires an authorization header which axiosPrivate provides
      try {
        await axiosPrivate.put(`/users/${params._id}/edit`, {
          username: formData.username,
          password: formData.password,
        });
        toast.success("Profile Updated");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <h1>Edit Profile</h1>
      <AvatarEditor storedUser={storedUser} />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>@</InputGroup.Text>
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
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter password"
            autoComplete="new-password"
            onChange={handleInput}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="bootBtn" variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default EditProfile;
