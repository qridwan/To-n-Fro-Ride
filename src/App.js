import React, { createContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home/Home';
import LoginForm from './Components/LoginForm/LoginForm';
import Destination from './Components/Destination/Destination';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import './App.css';
import Blog from './Components/Blog/Blog';


export const UserContext = createContext();
function App() {
const [isLoggenIn, setIsLoggedIn] = useState({})
    return (
        <UserContext.Provider value={[isLoggenIn, setIsLoggedIn]}>
        <Router>
        
      <div className="app ">
      <Navigation/>
         <Switch>
          <Route path="/login">
              <LoginForm/>
          </Route>
          <PrivateRoute path="/destination/:vehicle">
              <Destination/>
          </PrivateRoute>
          <Route path="/blog">
            <Blog/>
          </Route>
          <Route path="/home">
              <Home/>
          </Route>
          <Route exact path="/">
              <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
    </UserContext.Provider>
    );
}

export default App;
