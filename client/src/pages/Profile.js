import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/api/users/${params.uid}`);
      setUser(response.data);
    }
    fetchUser();
  }, [params]);

  return (
    <div>
      <img src={user.picture} alt="User Avatar" />
      {"@" + user.username}'s Profile
    </div>
  );
};

export default Profile;
