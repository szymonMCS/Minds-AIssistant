import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="main-content">
      <div className="jumbotron-centered">
        <div className="container text-center">
          <FontAwesomeIcon icon={faUserDoctor} size="6x" />
          <h1 className="display-3">Your daily diary</h1>
          <p className="lead">Place where you can post your daily diaries and discuss them with AI chatbot Coach</p>
          <hr />
          <div className="button-group">
            <Link className="btn btn-bd-light btn-lg" to="/register" role="button">Register</Link>
            <Link className="btn btn-dark btn-lg" to="/login" role="button">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;