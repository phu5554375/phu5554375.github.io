import React, { useState, useEffect } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/Common";
// import { setJwtSession } from "../Utils/jwtService";
import { Redirect } from "react-router-dom";

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  console.log(response);                   // The current login status of the person.
  if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI();  
  } else {                                 // Not logged into your webpage or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this webpage.';
  }
}
function checkLoginState() {               // Called when a person is finished with the Login Button.
  window.FB.getLoginStatus(function(response) {   // See the onlogin handler
    statusChangeCallback(response);
  });
}
window.fbAsyncInit = function() {
  window.FB.init({
    appId      : '780879455966763',
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version: 'v10.0'          // Use this Graph API version for this call.
  });
  window.FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
    statusChangeCallback(response);        // Returns the login status.
  });
  
};
function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  window.FB.api('http://ogid.daihaijsc.com/api/users/fb_login', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

function Login(props) {
  const [loading, setLoading] = useState(false);
  
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  // handle button click of login form

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://dev.ogid.daihaijsc.com/users/login", {
        username: username.value,
        password: password.value,
        applicationId: "08dbd700-1f38-11eb-91ff-dab8a2794d67",
        packageName: "webcuukiem",
        osName: "OTHER"
      })
      .then((response) => {
        const red = response.data;

        setUserSession(response.data.id, response.data.user);
        localStorage.setItem("userId", red.data.userId);
        localStorage.setItem("sessionId", red.data.sessionId);
        setRedirect(true);
      })
      .catch((error) => {
        // console.log(error.response);
        setError(error.response.data);
      });
  };
  return redirect ? (
    <Redirect to="/home" />
  ) : (
    <div>
      <div className="main main--ishopgo" role="main">
        {/*  Testimonial Section */}
        <div className="section section--video">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-xs-12 ">
                <div className="video">
                  <div className="user">
                    <form
                      autoComplete="on"
                      id="contact-form"
                      name="contact-form"
                      action="/abc"
                    >
                      <h3 className="title-page">Đăng nhập thành viên</h3>
                      <div className="form-group">
                        <div className="form-group">
                          <input
                            className="input form-control"
                            placeholder="Tên đăng nhập"
                            type="text"
                            {...username}
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-group">
                          <input
                            className="input form-control"
                            placeholder="Mật khẩu"
                            type="password"
                            {...password}
                            required="required"
                          />
                        </div>
                      </div>
                      {error && <p className="reg">{error.message}</p>}
                      <button
                        type="submit"
                        value={loading ? "Loading..." : "Login"}
                        onClick={handleLogin}
                        disabled={loading}
                        className="btn btn-user ui-gradient-peach"
                      >
                        {" "}
                        Đăng nhập
                      </button>
                    </form>
                    <div className="dk">
                      <a className="reg" href="/dangky">
                        Đăng ký tài khoản
                      </a>
                      <a className="reg" href="/fogotpass">
                        Quên mật khẩu
                      </a>
                    </div>
                    <button scope="public_profile,email" onClick={checkLoginState}>login facebook
                    </button>
                    <div id="status">wf
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="ui-footer subscribe-footer ui-waves">
          {/* Footer Copyright */}
          <div className="footer-copyright text-center">
            <div className="container">
              <div className="row align-items-center">
                {/* Copyright */}
                <div className="col-12">
                  <p style={{ color: "#000", fontSize: "14px", margin: 0 }}>
                    <b>
                      CÔNG TY CỔ PHẦN PHÁT TRIỂN KINH DOANH CÔNG NGHỆ ĐẠI HẢI
                    </b>
                  </p>
                  <p style={{ color: "#000", fontSize: "14px", margin: 0 }}>
                    Địa chỉ: Số 2 ngõ 136 phố Nguyễn An Ninh, Phường Tương Mai,
                    Quận Hoàng Mai, Thành phố Hà Nội, Việt Nam
                  </p>
                  <p style={{ color: "#000", fontSize: "14px", margin: 0 }}>
                    Phòng giao dịch: sảnh A office tòa Vinhomes Westpoint Đỗ Đức
                    Dục, Nam Từ Liêm, TP Hà Nội{" "}
                  </p>
                </div>
                {/* Social Icons */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};
export default Login;
