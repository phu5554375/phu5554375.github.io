import React, { useState, useEffect } from "react";
import { Table, Select } from "antd";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
const { Column } = Table;
const { Option } = Select;
const servers = [
  {
    serverId: 1,
    name: "S1 - Cửu Châu",
  },
];
function FormError(props) {
  if (props.isHidden) {
    return null;
  }
  return <div className="form-warning">{props.errorMessage}</div>;
}
function Bank() {
  const onChangeMoney = (event) => {
    setamount(event.target.value);
  };
  const [listMoney, setlistMoney] = useState([]);
  const [state, setState] = useState({});
  const [amount, setamount] = useState([]);
  const [severs, setsevers] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const serverId = useFormInput("");
  const [listServer, setListServer] = useState({});
  const handleMomo = () => {
    const headers = {
      Authorization: localStorage.getItem("sessionId"),
    };
    if(amount % 10000 == 0){
      axios
      .post(
        "https://ogid.daihaijsc.com/api/payment/atm-charge",
        { amount: amount - 0, serverId: parseInt(severs) },
        {
          headers: headers,
        }
      )
      .then((response) => {
        const red = response.data;
        if (red.status == 0) {
          window.location.href = red.data;
        }
      })
      .catch((error) => {});
        
    } else{
     
      setState ({
        
        isInputValid: false,
        errorMessage: "Số tiền phải là bội của 10.000 vnđ",
      });
    }
    
  };
  useEffect(() => {
    axios
      .get(
        "https://ogid.daihaijsc.com/api/application_servers/ckcv",
        {}
      )
      .then((response) => {
        const red = response.data;
        setListServer(red.data);
      })
      .catch((error) => {});
    const sectionId = localStorage.getItem("sessionId");
    if (sectionId == null) {
      setRedirect(true);
    }
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://ogid.daihaijsc.com/api/charging-package?application_id=08dbd700-1f38-11eb-91ff-dab8a2794d67&charging_method=ATM_CHARGE",
        {}
      )
      .then((response) => {
        const red = response.data;
        setlistMoney(red.data);
      })
      .catch((error) => {});
    const sectionId = localStorage.getItem("sessionId");
    if (sectionId == null) {
      setRedirect(true);
    }
  }, []);
  
  const onChangeSever = (event) => {
    setsevers(event.target.value);
  };
  return redirect ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <div className="main main--ishopgo" role="main">
        {/*  Testimonial Section */}
        <div className="section section--video">
          <div className="container">
            <h3 className="title-page">Nạp tiền ngân hàng</h3>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 left-content">
                <h4>quy định - hình thức - quy đổi</h4>
                <p className="mt-1">Người chơi sau khi nạp thành công đăng nhập vào game, chọn đúng nhân vật để được cộng vàng vào nhân vật đó.</p>
                <Table
                  dataSource={listMoney}
                  pagination={false}
                  scroll={{ y: 300 }}
                >
                  <Column
                    title="Tiền nạp"
                    dataIndex="packageAmount"
                    key="packageAmount"
                  />
                  <Column
                    title="Thành vàng"
                    dataIndex="description"
                    key="description"
                  />
                </Table>
              </div>
              <div className="col-12 col-md-4 right-content">
                <div className="card-body">
                  <div className="title">
                    <img src="img/Title1.png" />
                  </div>
                  <form autoComplete="on" id="contact-form" name="contact-form">
                  <div className="form-group">
                      <div className="form-group">
                        <select
                          onChange={onChangeSever}
                          dataSource={listServer}
                          className="form-control"
                        >
                          {listServer.length > 0 &&
                            listServer.map((item, key) => {
                              return (
                                <option key={key} value={item.serverId}>{item.name}</option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                   
                    <div className="form-group">
                      <div className="form-group">
                      <label>Nhập số tiền cần nạp</label>
                        <input
                          type="number"
                          name="number"
                          className="form-control"
                          placeholder="Nhập số tiền"
                          onChange={onChangeMoney}
                          {...amount}
                          required
                        />
                        <FormError
                          isHidden={state.isInputValid}
                          errorMessage={state.errorMessage}
                        />
                      </div>
                    </div>
                    <a onClick={handleMomo} className="btn btn-pri btn-money" />
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
  const handleMomo = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    handleMomo: handleMomo,
  };
};
export default Bank;
