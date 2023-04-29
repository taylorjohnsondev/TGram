import axios from "../hooks/useAxios";
import { Button } from "react-bootstrap";

const Follow = ({ handleFollow }) => {
  return (
    <div>
      <Button onClick={handleFollow}>Follow</Button>
    </div>
  );
};

export default Follow;
