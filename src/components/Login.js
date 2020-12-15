import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import { setJwtSession } from '../Utils/jwtService';
import { Redirect } from 'react-router-dom';

// import myFirstFont from '../fonts/SFUJamaicaRegular.TTF'

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const[JwtSession, setJwtSession] = useState('');
  
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://dev.ogid.daihaijsc.com/users/login', { username: username.value, password: password.value, applicationId:'08dbd700-1f38-11eb-91ff-dab8a2794d67' }).then(response => {
      setLoading(false);
      setJwtSession(response.jwt_access_toke);
      setUserSession(response.data.id, response.data.user);
      console.log(props);
      setRedirect(true);
    }).catch(error => {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    });
  }

  return redirect ? <Redirect to="/home" /> : (
    <div>
      <div className="main main--ishopgo" role="main">
        {/*  Testimonial Section */}
        <div className="section section--video">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-xs-12 ">
                <div className="video">
                  <div className="user">
                    <form autoComplete="on" id="contact-form" name="contact-form" action="/abc">
                      <h3 className="title-page">Đăng nhập thành viên</h3>
                     
                      <div className="form-group">
                        <div className="form-group">
                          <input 
                          className="input form-control" 
                          placeholder="Tên đăng nhập" 
                          type="text" {...username} 
                          autoComplete="new-password" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-group">
                          <input 
                          className="input form-control" 
                          placeholder="Mật khẩu" 
                          type="password" {...password} autoComplete="new-password" />
                        </div>
                      </div>
                     
                      <button type="button" 
                      value={loading ? 'Loading...' : 'Login'} 
                      onClick={handleLogin} disabled={loading} 
                      className="btn btn-user ui-gradient-peach"> Đăng nhập</button>
                    </form>
                    <div className="dk">
                      <a className="reg" href="/dangky">Đăng ký tài khoản</a>
                      <a className="reg" href="/fogotpass">Quên mật khẩu</a>
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
                  <p style={{color: '#000', fontSize: '14px', margin: 0}}><b>CÔNG TY CỔ PHẦN PHÁT TRIỂN KINH DOANH CÔNG NGHỆ ĐẠI HẢI</b></p>
                  <p style={{color: '#000', fontSize: '14px', margin: 0}}>Địa chỉ: Số 2 ngõ 136 phố Nguyễn An Ninh, Phường Tương Mai, Quận Hoàng Mai, Thành phố Hà Nội, Việt Nam</p>
                  <p style={{color: '#000', fontSize: '14px', margin: 0}}>Phòng giao dịch: sảnh A office tòa Vinhomes Westpoint Đỗ Đức Dục, Nam Từ Liêm, TP Hà Nội </p>
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
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
export default Login;