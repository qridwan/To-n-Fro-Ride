import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
  const [isLoggedIn, setIsLoggdedIn] = useContext(UserContext);
  console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;