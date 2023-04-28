import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Form } from "react-bootstrap";
import axios from "axios";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(false);

  const openForm = () => {
    setForm(true);
  };

  const closeForm = () => {
    setForm(false);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get("text");
    const post = { text };
    axios
      .post(`/api/posts/${params._id}`, post)
      .then((response) => {
        setPosts([...posts, response.data]);
        setForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    async function fetchUser() {
      const userData = await axios.get(`/api/users/${params._id}`);
      const postData = await axios.get(`/api/posts/${params._id}`);
      setUser(userData.data);
      setPosts(postData.data);
    }
    fetchUser();
  }, [params._id, posts.length]);

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={user.picture} alt="User Avatar" />
      </div>
      <div className="profile-name">{user.nickname}</div>
      <div className="profile-username">{`${user.username}`}</div>

      {storedUser && storedUser._id === params._id ? (
        <div>
          <div className="profile-posts">
            <h1 className="profile-newpost" onClick={openForm}>
              <AiOutlinePlusCircle />
            </h1>
            {form && (
              <div className="profile-newpost-form">
                <Form onSubmit={handlePost}>
                  <Form.Group controlId="formBasicText">
                    <Form.Label>Caption:</Form.Label>
                    <Form.Control as="textarea" name="text" />
                  </Form.Group>
                  <Form.Group controlId="file">
                    <Form.Label>Post file:</Form.Label>
                    <Form.Control type="file" name="file" />
                  </Form.Group>
                  <button type="submit">Post</button>
                  <button type="button" onClick={closeForm}>
                    Cancel
                  </button>
                </Form>
              </div>
            )}
            {posts.map((post) => (
              <div className="profile-post" key={post._id}>
                <img src={post.file} alt="Post" />
                <div>{post.text}</div>
                <div>{new Date(post.time).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="profile-posts">
          <h1 className="profile-h1">Posts</h1>
          {posts.map((post) => (
            <div className="profile-post" key={post._id}>
              <img src={post.file} alt="Post" />
              <div>{post.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
