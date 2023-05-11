import React, { useState } from "react";
import ModalComment from "./ModalComment";
import { AiOutlineHeart } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Post = ({
  post,
  handleLike,
  handleCommentInput,
  comment,
  handleCommentSubmit,
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
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
        <div>
          <ModalComment
            handleCommentInput={handleCommentInput}
            handleCommentSubmit={handleCommentSubmit}
            comment={comment}
            show={showCommentModal}
            setShow={setShowCommentModal}
            post={post._id}
          />
        </div>
      </div>
    </>
  );
};

export default Post;
