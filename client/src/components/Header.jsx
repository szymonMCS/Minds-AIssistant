import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { baseApiURL } from "./App";

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(`${baseApiURL}/logout`, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <h1 onClick={() => {navigate("/")}} className="link">
        <FontAwesomeIcon icon={faFaceSmile} className="header-icon"/>
         Minds AIssistant
      </h1>
      {user && <h2 style={{ marginTop: 5 }} className="link" onClick={logout}>Logout</h2>}
    </header>
  );
}

export default Header;