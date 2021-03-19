import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";
import './LoginForm.css'
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function LoginForm() {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);
const [user, setUser] = useState({});
  const [newUser, setNewUser] = useState(false);
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const { displayName, email } = user;
        const SignedInfo = {
          name: displayName,
          email: email
        };
        setIsLoggedIn(SignedInfo);
        history.replace(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.log(errorCode, errorMessage, email);
      });
  };

  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const isSignedIn = {
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL
        };
        console.log(result);
        setUserInfo(isSignedIn);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };


  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let fieldValid = false;
    if (e.target.name === "email") {
      fieldValid = /\S+@\S+\.\S+/.test(e.target.value.toLowerCase());
      // console.log(fieldValid);
    }
    if (e.target.name === "password") {
      //script for min 8 letter password, with at least a symbol, upper and lower case letters and a number
      fieldValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
        e.target.value
      );
      // console.log(fieldValid);
    }
    if (e.target.name === "name") {
      fieldValid = e.target.value;
    }

    if (fieldValid) {
      const newUserInfo = { ...userInfo };

      newUserInfo[e.target.name] = e.target.value;
      console.log(newUserInfo);
      setUserInfo(newUserInfo);
      // console.log(userInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && userInfo.email && userInfo.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((res) => {
          const newUserInfo = { ...userInfo };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUserInfo(newUserInfo);
          updateUserInfo(userInfo.name);
          // console.log(userInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...userInfo };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUserInfo(newUserInfo);
          // console.log(userInfo);
        });
    }
    if (!newUser && userInfo.email && userInfo.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((res) => {
          const newUserInfo = { ...userInfo };
          console.log(userInfo.name);
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUserInfo(newUserInfo);
          console.log(res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...userInfo };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUserInfo(newUserInfo);
        });
    }
    e.preventDefault();
  };

  return (
    <div className="login-form">
        <form>
          <>
            {" "}
            <input
              type="checkbox"
              onChange={() => setNewUser(!newUser)}
              name="newUser"
              label=""
            />
            <label htmlFor="newUser">New User Signup</label>
            <br />
            {newUser && (
              <>
              <h2>Create an account </h2>
              <input
                onBlur={handleBlur}
                type="text"
                name="name"
                placeholder="Your name"
              />
              </>
            )}
            <br />
            <br />
            <input
              onBlur={handleBlur}
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <br />
            <br />
            <input
              onBlur={handleBlur}
              type="password"
              name="password"
              placeholder="Your Password"
            />
            <br />
            <br />
            {newUser ? (
              <>
              
              <input onClick={handleSubmit} type="submit" value="Sign Up" />
              </>
            ) : (
              <input onClick={handleSubmit} type="submit" value="Login" />
            )}
          </>
        </form>

      {isLoggedIn.name && (
        <input onClick={handleSignOut} type="submit" value="Log Out" />
      )}
      <p>{user.error}</p>

      {/* google login */}
      {/* {userInfo.isSigned === false ? ( */}
        <button onClick={handleGoogleSignIn}>Sign In with GOOGLE</button>
      
      <br />
      <br />
        <button onClick={handleFbSignIn}>Sign In with Facebook</button>

      {/* <h4>Allready have an account? <span onChange={() => setNewUser(!newUser)}>Login</span></h4> */}
    </div>
  );
      }
export default LoginForm;