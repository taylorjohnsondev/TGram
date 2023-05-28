import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Post from "../components/Post";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
const initialComment = { text: "" };

const Following = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState(initialComment);
  const [error, setError] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get(
        `/api/posts/following/${storedUser._id}`
      );
      setPosts(response.data);
      setLoading(false);
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
        console.log(res.data);
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
      Following
      {storedUser ? (
        <>
          <Button className="bootBtn" onClick={() => navigate("/")}>
            All Posts
          </Button>
          <Button className="bootBtn" onClick={() => navigate("/following")}>
            Following
          </Button>
        </>
      ) : (
        <div className="username">
          Welcome to TGram! Have an account?
          <Button className="bootBtn" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      )}
      {posts.map((post) => (
        <>
          <Post
            post={post}
            error={error}
            key={post._id}
            handleLike={handleLike}
            handleCommentInput={handleCommentInput}
            comment={comment}
            handleCommentSubmit={handleCommentSubmit}
          />
        </> 
      ))} 
    </div>
  );
};

export default Following;
