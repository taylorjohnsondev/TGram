import React from "react";

const ShowComments = ({ post }) => {
  return (
    <div>
      {post.comments.map((comment) => (
        <li>{comment.text}</li>
      ))}
    </div>
  );
};

export default ShowComments;
