import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Introl from "./components/Introl";
import Login from "./components/Login";
import Dangky from "./components/Dangky";
import CardMobile from "./components/CardMobile";
import Event from "./components/Event";
import FogotPass from "./components/FogotPass";
import UpdateProfile from "./components/UpdateProfile";
import Bank from "./components/Bank";
import Momo from "./components/Momo";
import Congrats from "./components/Congrats";
import ResetPass from "./components/ResetPass";

import { getToken, removeUserSession, setUserSession } from "./Utils/Common";

import "./App.css";


function Error() {
  let { slug } = useParams();
  let msg = "Nạp tiền thất bại. Vui lòng liên hệ tổng đài để đc giải đáp!";
  if (slug == 3) {
    msg = "Nạp tiền thất bại. Vui lòng liên hệ tổng đài để đc giải đáp!";
  }
  if (slug == 4) {
    msg = "Nạp tiền thất bại. Vui lòng liên hệ tổng đài để đc giải đáp!";
  }
  if (slug == 5) {
    msg = "Nạp tiền thất bại. Vui lòng liên hệ tổng đài để đc giải đáp!";
  }

  return (
    <div className="congrats">
      <p className="red">{msg}</p>{" "}
    </div>
  );
}


function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    // const userStorage = localStorage.getItem("userStorage");
    // if (userStorage != null){
    //   setUser(userStorage);
    // }
    axios
      .get("https://ogid.daihaijsc.com/api/users/login")
      .then((response) => {
        setUserSession(response.data.id, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <Router>
      <div>
        <nav className="navbar navbar-fixed-top navbar-light">
          <div className="container">
            <a
              href="/"
              className="ui-variable-logo navbar-brand"
              title="daihai"
            >
              <img
                className="logo-default"
                src="img/logo-CuuKiemChiVuong.png"
                alt="daihai"
              />
            </a>
            <div className="ui-navigation navbar-right">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/introl">Giới thiệu</Link>
                </li>
                {/* <li><Link to="/event">Sự kiện</Link></li> */}
                {/* <li>
                  <Link to="/updateprofile">
                    {user.fullName || "Tài khoản"}
                  </Link>
                </li> */}
              </ul>
            </div>
            <a href="#" className="btn btn-sm ui-gradient-peach pull-right">
              0784 022 333
            </a>
            <a href="#" className="ui-mobile-nav-toggle pull-right" />
          </div>
        </nav>
        <Switch>
          <Route path="/resetpass">
            <ResetPass />
          </Route>
          <Route path="/error/:slug">
            <Error />
          </Route>
          <Route exact path="/error">
            <Error />
          </Route>
          <Route exact path="/congrats">
            <Congrats />
          </Route>
          <Route exact path="/momo">
            <Momo />
          </Route>
          <Route exact path="/bank">
            <Bank />
          </Route>
          <Route exact path="/updateprofile">
            <UpdateProfile />
          </Route>
          <Route exact path="/fogotpass">
            <FogotPass />
          </Route>
          <Route exact path="/cardmobile">
            <CardMobile />
          </Route>
          <Route exact path="/event">
            <Event />
          </Route>
          <Route exact path="/introl">
            <Introl />
          </Route>
          <Route exact path="/dangky">
            <Dangky />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
