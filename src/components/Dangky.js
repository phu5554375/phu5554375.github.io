import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Form, Input} from "antd";
import { Redirect } from 'react-router-dom';
import { setUserSession } from '../Utils/Common';
function FormError(props) {
  if (props.isHidden) {return null;}
  return (
    <div className="form-warning1">
        {props.errorMessage}
    </div>
  )
}
// function Liveedu(student) {
//   const state = {
//     value: '',
//     isInputValid: true,
//     errorMessage: ''
//     }
// }


function Dangky(props) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [redirect, setRedirect] = useState(false);
    const [state, setState] = useState({});

    const validateInput = (checkingText) => {
      /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */
      const checkDau = (str) => {
          var keywords = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
          return keywords.test(str);
      }

      let checkData;
      if (checkingText.includes(" ") ) {
        checkData= { isInputValid: false,
                 errorMessage: 'Tên đăng ký viết liền không dấu'};
      } else {
        checkData= { isInputValid: true,
          errorMessage: ''};
      }
      console.log("checkData=====", checkData);
      setState(checkData);
      return checkData;
    }

    const username = useFormInput('', validateInput);
    const password = useFormInput('');

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('https://ogid.daihaijsc.com/api/users/register', { 
          username: username.value, 
          password: password.value,
          applicationId: "08dbd700-1f38-11eb-91ff-dab8a2794d67",
          packageName: "webcuukiem",
          osName: "OTHER"
         }).then(response => {
        setLoading(false);
        setUserSession(response.data.id, response.data.user);
        console.log(props);
        setRedirect(true);

        }).catch(error => {
          setError(error.response.data);
        });
  }

  const handleInput = (event) => {
    const { value } = event.target;
    setState({value});
  };
  const handleInputValidation = (event) => {
    const { isInputValid, errorMessage } = validateInput(state.value);
    setState({
        isInputValid: isInputValid,
        errorMessage: errorMessage
    })
  };
  return redirect ? <Redirect to="/login" /> : (
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
                      <h3 className="title-page">Đăng ký thành viên</h3>

                      <Form.Item name="username" >
                        <Input
                           className="input form-control"
                           placeholder="Tên tài khoản"
                           type="text"
                           {...username}
                           required/>

                            <FormError
                          isHidden={state.isInputValid}
                          errorMessage={state.errorMessage} />
                      </Form.Item>
                      <Form.Item name="password" >
                        <Input
                           className="input form-control"
                           placeholder="Mật khẩu"
                           type="password"
                           value="password"
                            {...password}
                           required/>
                      </Form.Item>
                      {
                        error &&
                        <p className="reg">
                            {error.message}
                        </p>
                      }
                      <button type="button"
                      value={loading ? 'Loading...' : 'Login'}
                      onClick={handleLogin} disabled={loading}
                      className="btn btn-user ui-gradient-peach"> Đăng ký</button>
                    </form>
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
const useFormInput = (initialValue, checkSpace) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
      if(checkSpace) {
        const {isInputValid} = checkSpace(e.target.value);
        if(isInputValid) {
          setValue(e.target.value);
        }
      } else {
        setValue(e.target.value);
      }
    }

    return {
      value,
      onChange: handleChange
    }
  }
export default Dangky;
