import "./css/ToolTip.css";
import { useState } from "react";

const ShowToolTip = ({
  children,

  post,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className={`tooltip ${showTooltip ? "show" : ""}`}>
        {post.likes.length > 0 ? (
          post.likes.map((like, i) => (
            <span key={i}>
              {" "}
              @{like.username}
              {i !== post.likes.length - 1 ? ", " : " Liked this"}
            </span>
          ))
        ) : (
          <div>No Likes yet.</div>
        )}
      </span>

      {children}
    </div>
  );
};

export default ShowToolTip;
