import React, { useState, useContext } from "react";
import ModalComment from "./ModalComment";
import ShowComments from "./ShowComments";
import { AuthContext } from "../Context/AuthContext";
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

  const { user } = useContext(AuthContext);
  console.log(post);
  return (
    <>
      <div key={post._id} className="post-container">
        <div className="username">@{post.author?.username}</div>
        {isHomePage && (
          <Button
            className="pictureBtn"
            onClick={() => navigate(`users/${post.author._id}`)}
          >
            <img
              className="post-picture"
              src={
                post?.author?.picture !== "/defaultpicture.png"
                  ? `https://tgram-server.onrender.com/${post.author?.picture}`
                  : `${
                      post.author.googlePicture ||
                      "/defaultpicture.png"
                    }`
              }
              alt="user avatar"
            />
          </Button>
        )}
        {/* post.file already had a "/" in front of it. */}
        <div className="photo-container">
          <img
            src={`https://tgram-server.onrender.com${post.file}`}
            alt="Post Media"
            className="photo"
          />
        </div>
        <div className="description">{post.text}</div>
        <div className="post-date">
          {new Date(post.time).toLocaleString()}
        </div>

        {user && (
          <>
            <div onClick={() => handleLike(post._id)}>
              {post.likes && post.likes.length >= 0 && (
                <ShowToolTip post={post}>
                  <AiOutlineHeart
                    size={24}
                    style={{ marginTop: "5px" }}
                  />
                  {post.likes.length}
                </ShowToolTip>
              )}
            </div>
            <div className="modal-align">
              <ModalComment
                handleCommentInput={handleCommentInput}
                handleCommentSubmit={handleCommentSubmit}
                comment={comment}
                show={showCommentModal}
                setShow={setShowCommentModal}
                post={post._id}
              />
            </div>
          </>
        )}

        <ShowComments post={post} />
      </div>
    </>
  );
};

export default Post;
