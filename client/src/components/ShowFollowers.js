import { Link } from "react-router-dom";
import "./css/Followers.css";

const ShowFollowers = ({ followers }) => {
  return (
    <div className="container">
      <span className="title">Followers:</span>
      {followers &&
        followers.map((follower) => (
          <ul key={follower._id}>
            <Link to={`/users/${follower._id}`} className="Link">
              <li>@{follower.username}</li>
            </Link>
          </ul>
        ))}
    </div>
  );
};

export default ShowFollowers;
