import React, { useState, useEffect } from "react";
import axios from "axios";
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { setUserSession } from "../Utils/Common";
function LoginFacebook() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [listtoken, setListtoken] = useState();
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    axios
      .post("https://ogid.daihaijsc.com/api/users/fb_login", {
        "accessToken": listtoken,
        "applicationId": "08dbd700-1f38-11eb-91ff-dab8a2794d67",
        "packageName": "webcuukiem",
        "osName": "OTHER"
       })
      .then((response) => {
        const red = response.data;
        setUserSession(response.data.id, response.data.user);
        localStorage.setItem("userId", red.data.userId);
        localStorage.setItem("sessionId", red.data.sessionId);
        setRedirect(true);
      })
      .catch((error) => console.log(error));
  }, [listtoken]);
  const responseFacebook = (response) => {
    setData(response);
    setPicture(response.picture.data.url);
    setListtoken(response.accessToken);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }
  return redirect ? (
    <Redirect to="/home" />
  ) : (
    <div class="container">
      <Card className="face-log">
        <Card.Header>
          { !login &&
            <FacebookLogin
              appId="254237539758989"
              autoLoad={false}
              textButton="Đăng nhập bằng Facebook"
              listtoken={listtoken}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
         
        </Card.Header>
        
      </Card>
    </div>
  );
}

export default LoginFacebook;
