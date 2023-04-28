import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const userData = await axios.get(`/api/users/${params._id}`);
      const postData = await axios.get(`/api/posts/${params._id}`);
      setUser(userData.data);
      setPosts(postData.data);
    }
    fetchUser();
  }, [params]);

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={user.picture} alt="User Avatar" />
      </div>
      <div className="profile-name">{user.nickname}</div>
      <div className="profile-username">{`${user.username}`}</div>

      <div className="profile-posts">
        {posts.map((post) => (
          <div className="profile-post" key={post._id}>
            <img src={post.file} alt="Post" />
            <div>{post.text}</div>
          </div>
        ))} 
      </div>
    </div>
  );
};

export default Profile;
