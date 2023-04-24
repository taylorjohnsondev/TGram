import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const Homepage = () => {
  return (
    <>
      <div className="post-container">
        <div className="username">Taylor Johnson</div>
        <div className="username">@TaylorJohnson</div>
        <div className="photo-container">
          <img
            src="https://www.rd.com/wp-content/uploads/2019/11/cat-10-e1573844975155.jpg"
            alt="Post Media"
            className="photo"
          />
        </div>
        <div className="description">This is a test post of a cat</div>
        <div>
          <AiOutlineHeart /> <FaRegComment />
        </div>
      </div>
    </>
  );
};

export default Homepage;
