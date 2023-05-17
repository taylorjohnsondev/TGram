import axios from "../hooks/useAxios";
import { Button } from "react-bootstrap";

const Follow = ({ handleFollow, error }) => {
  return (
    <div>
      <Button onClick={handleFollow}>Follow</Button>
      <div style={{ color: "red" }}>{error && error}</div>
    </div>
  );
};

export default Follow;
