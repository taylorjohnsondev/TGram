import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaRegComment } from "react-icons/fa";

function ModalComment({
  handleCommentInput,
  handleCommentSubmit,
  comment,
  show,
  setShow,
  post, //this is the post id coming from
}) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FaRegComment size={24} onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => handleCommentSubmit(event, post)}
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment?.text}
                onChange={handleCommentInput}
              />
            </Form.Group>
            <Button
              className="bootBtn"
              type="submit"
              variant="primary"
              onClick={handleClose}
            >
              Post Comment
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bootBtn"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComment;
