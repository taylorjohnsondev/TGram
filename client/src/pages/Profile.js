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

const initialComment = { text: "" };

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(false);
  const [error, setError] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [comment, setComment] = useState(initialComment);
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
        const followers = res.data.userToUpdate.followers;
        console.log(res);
        setFollowers([...followers, followers]);
        console.log(followers);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      });
  };

  //check if user has a photo from google
  //if not use user.picture
  //takes user object
  const checkForGooglePic = (user) => {
    if (user.googlePicture) {
      return user.googlePicture;
    } else {
      return user.picture;
    }
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
  }, [params._id, posts.length, comment]);

  const handleLike = async (postId) => {
    const req = { user_id: storedUser._id };
    await axiosPrivate
      .put(`/posts/like/${postId}`, req)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={checkForGooglePic(user)} alt="User Avatar" />
      </div>
      <div className="profile-name">{user.nickname}</div>
      <div className="profile-username">{`${user.username}`}</div>

      {storedUser && storedUser._id === params._id ? (
        <div>
          <div className="posts-container">
            <h1 className="profile-newpost" onClick={openForm}>
              <AiOutlinePlusCircle />
            </h1>
            <Button
              onClick={() => navigate(`/users/${params._id}/edit`)}
            >
              Edit Profile
            </Button>
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
                  <button type="button" onClick={closeForm}>
                    Cancel
                  </button>
                </Form>
              </div>
            )}
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
