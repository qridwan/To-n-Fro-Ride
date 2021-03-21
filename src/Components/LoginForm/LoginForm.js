import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";
import "./LoginForm.css";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const LoginForm = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const { displayName, email } = user;
        const SignedInfo = {
          name: displayName,
          email: email,
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
        const user = result.user;
        console.log(user);
        const { displayName, email } = user;
        const SignedInfo = {
          name: displayName,
          email: email,
        };
        setIsLoggedIn(SignedInfo);
        history.replace(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        // console.log(errorCode, errorMessage, email);
      });
  };

  //=========================sign || register form setup==========================
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
const [error, setError] = useState({
  status: false,
  message: ""
})
  const onSubmit = (data) => {
    console.log(data.fullname);
    if (newUser && data.email && data.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          let user = userCredential.user;
          user = firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: `${data.fullname}`,
            })
            .then(function () {
              console.log("Update successful.");
              const { displayName, email } = user;
              const SignedInfo = {
                name: displayName,
                email: email,
              };
              setIsLoggedIn(SignedInfo);
              history.replace(from);
            })
            .catch(function (error) {
              console.log("An error happened.");
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(errorCode);
        });
    }

    if (!newUser && data.email && data.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const { displayName, email } = user;
          const SignedInfo = {
            name: displayName,
            email: email,
          };
          setIsLoggedIn(SignedInfo);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const gotError = {
            status: true,
            message: errorMessage
          }
          setError(gotError)
        });
    }
  };

  const [newUser, setNewUser] = useState(true);
  const handleLogin = () => {
    setNewUser(false);
  };
  const handleSignUp = () => {
    setNewUser(true);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        {newUser && (
          <>
            <input
              name="fullname"
              placeholder="Full Name"
              ref={register({ required: true })}
            />{" "}
            {errors.fullname && <small>Full-name is required.</small>}
          </>
        )}
        <input
          name="email"
          placeholder="Your Email"
          ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
        />
        {errors.email && <small>Give a valid email!</small>}
        <input
          name="password"
          placeholder="Password"
          type="password"
          ref={register({
            pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          })}
        />
        {errors.password && (
          <small>
            Minimum 8 letters password, with at least a symbol, upper and
            lowercase and a digit
          </small>
        )}
        <br />
        {newUser ? (
          <input type="submit" value="Register" />
        ) : (
          <input type="submit" value="Login" />
        )}
        {newUser ? (
          <h6>
            Already have an account? <span onClick={handleLogin}>Login</span>{" "}
          </h6>
        ) : (
          <h6>
            Create New Account? <span onClick={handleSignUp}> Register</span>{" "}
          </h6>
        )}
        {error.status && <small>{error.message}</small>}
      </form>

      {/* google login */}
      {/* {userInfo.isSigned === false ? ( */}
      <button onClick={handleGoogleSignIn}>
        {" "}
        <FontAwesomeIcon className="text-success" icon={faGoogle} /> Sign In
      </button>

      <br />
      <br />
      <button onClick={handleFbSignIn}>
        {" "}
        <FontAwesomeIcon className="text-primary" icon={faFacebookF} /> Sign In
      </button>
    </div>
  );
};
export default LoginForm;
