import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="post-container">
          <div className="username">{post.author.username}</div>
          <div className="photo-container">
            <img src={post.file} alt="Post Media" className="photo" />
            {post.text}
          </div> 
          <div className="description">{post.text}</div>
          <div>
            <AiOutlineHeart /> <FaRegComment />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
