import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShowComments = ({ post }) => {
  return (
    <div>
      {post.comments.map((comment) => (
        <Card style={{ width: "18rem" }} key={comment._id}>
          <Card.Header style={{ textAlign: "center" }}>
            <Card.Img
              src={
                comment.author.picture !== "/defaultpicture.png"
                  ? `/${comment.author.picture}`
                  : `${
                      comment.author.googlePicture ||
                      "/defaultpicture.png"
                    }`
              }
              style={{
                width: "25px",
                margin: "3px",
                borderRadius: "50px",
              }}
            />
            <Link
              to={`/users/${comment.author._id}`}
              className="Link"
            >
              @{comment.author.username}
            </Link>
          </Card.Header>

          <ListGroup variant="flush">
            <ListGroup.Item style={{ textAlign: "center" }}>
              {comment.text}{" "}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ))}
    </div>
  );
};

export default ShowComments;
