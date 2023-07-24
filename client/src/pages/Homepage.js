import React, { useState, useEffect } from "react";
import axios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Post from "../components/Post";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
const initialComment = { text: "" };

const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState(initialComment);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [showFollowedPosts, setShowFollowedPosts] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      let response;
      if (showFollowedPosts) {
        response = await axios.get(`/posts/following/${storedUser._id}`);
      } else {
        response = await axios.get("/posts");
      }

      if (response.status === 204) {
        toast.error("You are not following anyone yet.");
      }

      setPosts(response.data);
      setLoading(false);
    }
    fetchPosts();
  }, [showFollowedPosts, likes]);

  const handleLike = async (postId) => {
    const req = { user_id: storedUser._id };
    await axiosPrivate
      .put(`/posts/like/${postId}`, req)
      .then((res) => {
        console.log(res);
        toast.success("Liked!");
        const updatedLikesLength = res.data.updatedPost.likes.length;
        setLikes(updatedLikesLength);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
        toast.error(err.response.data.error);
      });
  };

  const handleCommentInput = (event) => {
    setComment({
      text: event.target.value,
    });
  };

  const handleCommentSubmit = async (event, postId) => {
    event.preventDefault();

    await axiosPrivate
      .put(`posts/comment/${postId}`, {
        text: comment.text,
        user_id: storedUser._id,
      })
      .then((res) => {
        const { updatedPost } = res.data;

        const updatedPosts = posts.map((post) => {
          if (post._id === updatedPost._id) {
            return {
              ...updatedPost,
              author: post.author,
            };
          }
          return post;
        });
        setPosts(updatedPosts);

        setComment(initialComment);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="posts-container">
      {storedUser ? (
        <>
          <div className="filter-btn-container">
            <Button
              className="bootBtn"
              onClick={() => setShowFollowedPosts(false)}
            >
              All Posts
            </Button>
            <Button
              className="bootBtn"
              onClick={() => setShowFollowedPosts(true)}
            >
              Following
            </Button>
          </div>
        </>
      ) : (
        <div className="username">
          Welcome to TGram! Have an account?
          <Button className="bootBtn" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      )}
      {posts &&
        posts.map((post) => (
          <Post
            post={post}
            error={error}
            key={post._id}
            handleLike={handleLike}
            handleCommentInput={handleCommentInput}
            comment={comment}
            handleCommentSubmit={handleCommentSubmit}
          />
        ))}
    </div>
  );
};

export default Homepage;
