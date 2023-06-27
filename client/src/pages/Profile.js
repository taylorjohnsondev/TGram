import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button, Form } from "react-bootstrap";
import axios from "../hooks/useAxios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Follow from "../components/Follow";
import ShowFollowers from "../components/ShowFollowers";
import Post from "../components/Post";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ShowToolTip from "../components/ShowToolTip";
import { checkWhichProfilePic } from "../utils/checkProfilePic";

const initialComment = { text: "" };

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(false);
  const [error, setError] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [comment, setComment] = useState(initialComment);
  const [likes, setLikes] = useState(0);

  const axiosPrivate = useAxiosPrivate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const openForm = () => {
    setForm(true);
  };

  const closeForm = () => {
    setForm(false);
  };

  const handlePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get("text");
    const file = formData.get("file");
    const postData = new FormData();
    postData.append("text", text);
    postData.append("file", file);
    try {
      const response = await axios.post(
        `/posts/${params._id}`,
        postData
      );

      setPosts([...posts, response.data]);
      setForm(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        return toast.error(error.response.data.error);
      }
    }
  };

  const handleFollow = async () => {
    await axiosPrivate
      .put(`/users/follow/${params._id}`)
      .then((res) => {
        console.log(res);
        const followers = res.data.userBeingFollowed.followers;

        setFollowers([...followers, followers]);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    async function fetchUser() {
      const userData = await axios.get(`/users/${params._id}`);
      const postData = await axios.get(`/posts/${params._id}`);

      setFollowers(userData.data.followers);
      setUser(userData.data);
      setPosts(postData.data);
      setLoading(false);
    }
    fetchUser();
  }, [params._id, posts.length, comment, likes]);

  const handleLike = async (postId) => {
    const req = { user_id: storedUser._id };
    const response = await axiosPrivate
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
        console.log(res.data);
        setComment(initialComment);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img
          src={`${checkWhichProfilePic(user)}`}
          alt="User Avatar"
        />
      </div>
      <div className="profile-name">{user.nickname}</div>
      <div className="profile-username">{`${user.username}`}</div>

      {storedUser && storedUser._id === params._id ? (
        <div>
          <div className="posts-container">
            <Button
              className="bootBtn"
              onClick={() => navigate(`/users/${params._id}/edit`)}
            >
              Edit Profile
            </Button>
            <h1 className="profile-newpost" onClick={openForm}>
              <ShowToolTip post={null}>
                <AiOutlinePlusCircle />
              </ShowToolTip>
            </h1>
            {form && (
              <div className="profile-newpost-form">
                <Form
                  onSubmit={handlePost}
                  encType="multipart/form-data"
                >
                  <Form.Group controlId="formBasicText">
                    <Form.Label>Caption:</Form.Label>
                    <Form.Control as="textarea" name="text" />
                  </Form.Group>
                  <Form.Group controlId="file">
                    <Form.Label>Post file:</Form.Label>
                    <Form.Control type="file" name="file" />
                  </Form.Group>
                  <button type="submit">Post</button>
                  <button
                    style={{ marginTop: "5px" }}
                    type="button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                </Form>
              </div>
            )}
            {posts.map((post) => (
              <Post
                post={post}
                key={post._id}
                handleLike={handleLike}
                handleCommentInput={handleCommentInput}
                comment={comment}
                handleCommentSubmit={handleCommentSubmit}
                checkWhichProfilePic={checkWhichProfilePic}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="follow">
          <div>
            <Follow handleFollow={handleFollow} error={error} />
          </div>
          <div className="profile-posts">
            <h1 className="profile-h1">Posts</h1>
            {posts.map((post) => (
              <>
                <Post
                  post={post}
                  key={post._id}
                  handleLike={handleLike}
                  handleCommentInput={handleCommentInput}
                  comment={comment}
                  handleCommentSubmit={handleCommentSubmit}
                />
              </>
            ))}
          </div>
        </div>
      )}
      <div className="followers">
        <ShowFollowers followers={followers} key={followers._id} />
      </div>
    </div>
  );
};

export default Profile;
