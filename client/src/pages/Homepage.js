import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ShowComments from "../components/ShowComments";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Post from "../components/Post";

const initialComment = { text: "" };

const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState(initialComment);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const axiosPrivate = useAxiosPrivate();
 
  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    }
    fetchPosts();
  }, [comment]);

  const handleLike = async (postId) => {
    const req = { user_id: storedUser._id };
    await axiosPrivate
      .put(`/posts/like/${postId}`, req)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleCommentInput = (event) => {
    console.log(event.currentTarget);
    setComment({
      text: event.target.value,
    });
    console.log(comment);
  };

  const handleCommentSubmit = async (event, postId) => {
    event.preventDefault();

    console.log(event);

    await axiosPrivate
      .put(`posts/comment/${postId}`, {
        text: comment.text,
        user_id: storedUser._id,
      })
      .then((res) => {
        console.log(res.data);
        setComment(initialComment);
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
        <>
          <Post
            post={post}
            handleLike={handleLike}
            handleCommentInput={handleCommentInput}
            comment={comment}
            handleCommentSubmit={handleCommentSubmit}
          />
          <ShowComments post={post} />
        </>
      ))}
    </div>
  );
};

export default Homepage;
