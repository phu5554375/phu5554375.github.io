import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import axios from 'axios';
import Home from './components/Home';
import Introl from './components/Introl';
import Login from './components/Login';
import Dangky from './components/Dangky';
import CardMobile from './components/CardMobile';
import Event from './components/Event';
import FogotPass from './components/FogotPass';
import UpdateProfile from './components/UpdateProfile';


import { getToken, removeUserSession, setUserSession } from './Utils/Common';

import './App.css';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get('http://dev.ogid.daihaijsc.com/users/login').then(response => {
      setUserSession(response.data.id, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <Router>
      <div>
        <nav className="navbar navbar-fixed-top navbar-light">
        <div className="container">
          <a href="/" className="ui-variable-logo navbar-brand" title="daihai">
            <img className="logo-default" src="img/logo-CuuKiemChiVuong.png" alt="daihai" />
          </a>
          <div className="ui-navigation navbar-right">
            <ul className="nav navbar-nav">
              
              <li><Link to="/introl">Giới thiệu</Link></li>
              <li><Link to="/event">Sự kiện</Link></li>
              <li><Link to="/Login">Tài khoản</Link></li>
            </ul>
          </div>
          <a href="#" className="btn btn-sm ui-gradient-peach pull-right">0784 022 333</a>
          <a href="#" className="ui-mobile-nav-toggle pull-right" />
        </div>
      </nav>
    <Switch>
         
          <Route path="/updateprofile">
            <UpdateProfile />
          </Route>
        <Route path="/fogotpass">
            <FogotPass />
          </Route>
        <Route path="/cardmobile">
            <CardMobile />
          </Route>
          <Route path="/event">
            <Event />
          </Route>
          <Route path="/introl">
            <Introl />
          </Route>
          <Route path="/dangky">
            <Dangky />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
