import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    }
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    const req = { user_id: storedUser._id };
    await axiosPrivate
      .put(`/posts/like/${postId}`, req)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="posts-container">
      {storedUser ? (
        <div className="username">{"Welcome " + storedUser.username}</div>
      ) : (
        <div className="username">
          Welcome to TGram! Have an account?
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      )}
      {posts.map((post) => (
        <div key={post._id} className="post-container">
          <div className="username">{post.author.username}</div>
          <Button onClick={() => navigate(`users/${post.author._id}`)}>
            Profile
          </Button>
          <div className="photo-container">
            <img src={post.file} alt="Post Media" className="photo" />
          </div>
          <div className="description">{post.text}</div>
          <div>{new Date(post.time).toLocaleString()}</div>

          <div onClick={() => handleLike(post._id)}>
            <AiOutlineHeart />
            {post.likes.length}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
