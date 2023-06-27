import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Comment.css";

const ShowComments = ({ post }) => {
  return (
    <div>
      {post.comments.map((comment) => (
        <Card className="comment" key={comment._id}>
          <Card.Header
            className="header"
            style={{ textAlign: "center" }}
          >
            <Card.Img
              src={
                comment.author?.picture !== "/defaultpicture.png"
                  ? `https://tgram-server.onrender.com/${comment.author?.picture}`
                  : `${
                      comment.author.googlePicture ||
                      "/defaultpicture.png"
                    }`
              }
              className="profile-picture"
            />
            <Link to={`/users/${comment.author?._id}`} id="username">
              @{comment.author?.username}
            </Link>
          </Card.Header>
          <Card.Body className="card-body">
            <ListGroup variant="flush">
              <ListGroup.Item className="comment-text">
                {comment.text}{" "}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ShowComments;
