import { Link } from "react-router-dom";

const ShowFollowers = ({ followers }) => {
  return (
    <div>
      <h1>Followers:</h1>
      {followers &&
        followers.map((follower) => (
          <ul key={follower._id}>
            <Link to={`/users/${follower._id}`}>
              <li>{follower.username}</li>
            </Link>
          </ul>
        ))}
    </div>
  );
};

export default ShowFollowers;
