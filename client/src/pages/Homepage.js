import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalComment from "../components/ModalComment";
import ShowComments from "../components/ShowComments";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const initialComment = { text: "" };

const Homepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState(initialComment);
  const [show, setShow] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const axiosPrivate = useAxiosPrivate();

  const handleClose = () => setShow(false);

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
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="posts-container">
      {storedUser ? (
        <div className="username">
          {"Welcome " + storedUser.username}
        </div>
      ) : (
        <div className="username">
          Welcome to TGram! Have an account?
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      )}
      {posts.map((post) => (
        <>
          <div key={post._id} className="post-container">
            <div className="username">{post.author.username}</div>
            <Button
              onClick={() => navigate(`users/${post.author._id}`)}
            >
              Profile
            </Button>
            <div className="photo-container">
              <img
                src={post.file}
                alt="Post Media"
                className="photo"
              />
            </div>
            <div className="description">{post.text}</div>
            <div>{new Date(post.time).toLocaleString()}</div>

            <div onClick={() => handleLike(post._id)}>
              <AiOutlineHeart />
              {post.likes.length}
            </div>

            <ModalComment
              handleCommentInput={handleCommentInput}
              comment={comment}
              handleCommentSubmit={handleCommentSubmit}
              post={post._id}
              setShow={setShow}
              show={show}
              handleClose={handleClose}
            />
          </div>
          <ShowComments post={post} />
        </>
      ))}
    </div>
  );
};

export default Homepage;
