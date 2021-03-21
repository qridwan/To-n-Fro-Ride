import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import firebase from "firebase/app";
import "firebase/auth";
import "./Navigation.css";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn({});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Navbar className="bg-info" expand="lg">
      <Navbar.Brand  className="text-light font-weight-bolder">
        To & Fro RIDE
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto ">
        <Nav.Link>
          <Link className="text-light" to="/home">
            Home
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="text-light" to="/home">
            Destination
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="text-light" to="/blog">
            Blog
          </Link>
        </Nav.Link>
        <Nav.Link>
          {!isLoggedIn.email ? (
            <Link to="/login">
              <button className="p-2 round">Login</button>
            </Link>
          ) : (
            <>
              <span className="mx-2 bg-success p-3 text-light ">
                {isLoggedIn.name}
              </span>
              <button onClick={handleSignOut} className="p-2 round">
                Logout
              </button>
            </>
          )}
        </Nav.Link>
      </Nav>
      </Navbar.Collapse>
     
    </Navbar>
  );
};

export default Navigation;
