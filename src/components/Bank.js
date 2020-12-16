import React, { useState, useEffect } from "react";
import axios from "axios";

function Bank() {
  const [loading, setLoading] = useState(false);
  const merchantAccount = useFormInput("");
  const pinCard = useFormInput("");
  const cardSerial = useFormInput("");
  const cardPrice = useFormInput("");
  const [error, setError] = useState(null);
  const [state, setState] = useState('');
  // handle button click of login form
  const handleCard = () => {
 
    axios
      .post("http://dev.ogid.daihaijsc.com/users/login", {
        merchantAccount: merchantAccount.value,
        pinCard: pinCard.value,
        cardSerial: cardSerial.value,
        cardPrice: cardPrice.value,
      })
      .then((response) => {
        const red = response.data;
        setState({ red: red });
     
      })
      .catch((error) => {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      });
  };
  const onHandleChange = (event) => {
    console.log();
  }
  return (
    <div>
         <div className="main main--ishopgo" role="main">
        {/*  Testimonial Section */}
        <div className="section section--video">
          <div className="container">
            <h3 className="title-page">Nạp tiền bằng thẻ cào</h3>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 left-content">
                <h4>quy định - hình thức - quy đổi</h4>
                <p>Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang
                  phục vụ
                  cho in ấn. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ
                  những
                  năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu
                  văn bản.
                </p>
                <table className="table table-striped table-bordered table--whs-prc">
                  <thead>
                    <tr>
                      <th className="whs-prc-num">Mệnh giá thẻ cào</th>
                      <th className="whs-prc-qty">Vàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="whs-prc-num">
                        <div className="whs-prc-num__wrp">
                          <div className="whs-prc-num__mai">100k</div>
                        </div>
                      </td>
                      <td className="whs-prc-num">
                        <div className="whs-prc-num__wrp">
                          <div className="whs-prc-num__mai">7.000.000 vàng</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whs-prc-num">
                        <div className="whs-prc-num__wrp">
                          <div className="whs-prc-num__mai">100k</div>
                        </div>
                      </td>
                      <td className="whs-prc-num">
                        <div className="whs-prc-num__wrp">
                          <div className="whs-prc-num__mai">7.000.000 vàng</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whs-prc-num">
                        <div className="whs-prc-num__wrp">
                          <div className="whs-prc-num__mai">100k</div>
                        </div>
                      </td>
                      <td className="whs-prc-num">
                        <div className="whs-prc-num__wrp">
                          <div className="whs-prc-num__mai">7.000.000 vàng</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whs-prc-num">
                        <div className="whs-prc-num__wrp">
                          <div className="whs-prc-num__mai">100k</div>
                        </div>
                      </td>
                      <td className="whs-prc-num">
                        <div className="whs-prc-num__wrp">
                          <div className="whs-prc-num__mai">7.000.000 vàng</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-12 col-md-4 right-content">
                <div className="card-body">
                  <div className="title"><img src="img/Title1.png" /></div>
                  <form autoComplete="on" id="contact-form" name="contact-form">

                  <div className="form-group">
                        <div className="form-group">
                          <input
                            className="input form-control"
                            placeholder="Tên đăng nhập"
                            type="text"
                            
                            onChange={onHandleChange}
                           
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-group">
                          <input
                            className="input form-control"
                            placeholder="Mã số thẻ cào"
                            type="text"
                            {...pinCard}
                            
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-group">
                          <input
                            className="input form-control"
                            placeholder="Seri thẻ cào"
                            type="text"
                            {...cardSerial}
                            
                          />
                        </div>
                      </div>
                    <div className="form-group">
                      <div className="form-group">
                        <select className="form-control">
                          <option>Chọn mệnh giá gói nạp </option>
                          <option>50k</option>
                          <option>100k</option>
                          <option>500k</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="form-group">
                        <select className="form-control">
                          <option>Loại thẻ </option>
                          <option>Viettel</option>
                          <option>Mobiphone</option>
                          <option>Vinaphone</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" onClick={handleCard} className="btn btn-pri btn-money" />
                  </form>
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
                  <p style={{color: '#000', fontSize: '14px', margin: 0}}><b>CÔNG TY CỔ PHẦN PHÁT TRIỂN KINH DOANH CÔNG
                      NGHỆ ĐẠI HẢI</b></p>
                  <p style={{color: '#000', fontSize: '14px', margin: 0}}>Địa chỉ: Số 2 ngõ 136 phố Nguyễn An Ninh,
                    Phường Tương Mai, Quận Hoàng Mai, Thành phố Hà Nội, Việt Nam</p>
                  <p style={{color: '#000', fontSize: '14px', margin: 0}}>Phòng giao dịch: sảnh A office tòa Vinhomes
                    Westpoint Đỗ Đức Dục, Nam Từ Liêm, TP Hà Nội </p>
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
  const handleCard = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleCard,
  };
};
export default Bank;
