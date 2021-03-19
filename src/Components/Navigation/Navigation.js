import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import firebase from "firebase/app";
import "firebase/auth";

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
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">To & Fro RIDE</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link>
          {" "}
          <Link to="/home">Home</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/destination">Destination</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/blog">Blog</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/contact">Contact</Link>
        </Nav.Link>
        <Nav.Link>
          {!isLoggedIn.name ? 
          <Link to="/login">
          <button className="p-2 round">Login</button>
        </Link> :
        <>
        <span>{isLoggedIn.name}</span>
        <button onClick={handleSignOut} className="p-2 round">Logout</button>

        </> 
        }
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
