import React, { useState } from "react";
import ModalComment from "./ModalComment";
import ShowComments from "./ShowComments";
import { AiOutlineHeart } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import ShowToolTip from "./ShowToolTip";

const Post = ({
  post,
  handleLike,
  handleCommentInput,
  comment,
  handleCommentSubmit,
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <div key={post._id} className="post-container">
        <div className="username">{post.author.username}</div>
        {isHomePage && (
          <Button
            className="pictureBtn" 
            onClick={() => navigate(`users/${post.author._id}`)}
          >
            <img
              className="post-picture"
              src={
                post.author.googlePicture
                  ? post.author.googlePicture
                  : post.author.picture
              }
            ></img>
          </Button>
        )}
        <div className="photo-container">
          <img src={post.file} alt="Post Media" className="photo" />
        </div>
        <div className="description">{post.text}</div>
        <div>{new Date(post.time).toLocaleString()}</div>

        <div onClick={() => handleLike(post._id)}>
          {post.likes && post.likes.length >= 0 && (
            <ShowToolTip post={post}>
              <AiOutlineHeart />
              {post.likes.length}
            </ShowToolTip>
          )}
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
        <ShowComments post={post} />
      </div>
    </>
  );
};

export default Post;
