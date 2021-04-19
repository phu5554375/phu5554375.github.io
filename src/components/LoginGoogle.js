import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import { setUserSession } from "../Utils/Common";
function LoginGoogle() {
  const [listtoken, setListtoken] = useState();
  const [redirect, setRedirect] = useState(false);
  const responseGoogle = (response) => {
    console.log(response);
  };
  useEffect(() => {
    axios
      .post("https://ogid.daihaijsc.com/api/payment/verify/google-play/ckcv", {
        idToken: listtoken,
        applicationId: "08dbd700-1f38-11eb-91ff-dab8a2794d67",
        packageName: "webcuukiem",
        osname: "OTHER",
      })
      .then((response) => {
        const red = response.data;
        setUserSession(response.data.id, response.data.user);
        
      })
      .catch((error) => console.log(error));
  }, [listtoken]);

  return redirect ? (
    <Redirect to="/home" />
  ) : (
    <div class="container">
      <GoogleLogin
        clientId="556793270638-k98gc5e0a9042fu9c0kf2htgupsib5s2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default LoginGoogle;
