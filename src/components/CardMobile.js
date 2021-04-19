import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Select } from "antd";
import { Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
const { Column } = Table;
const servers = [
  {
    serverId: 1,
    name: "S1 - Cửu Châu",
  },
];
const types = [
  {
    key: "vt",
    name: "Viettel",
  },
  {
    key: "mb",
    name: "Mobile",
  },
  {
    key: "vn",
    name: "Vinaphone",
  },
];
let countCheck = 0;

function CardMobile() {
  const [loading, setLoading] = useState(false);
  const [iscalling, setIscalling] = useState(false);
  const merchantAccount = useFormInput("");
  const code = useFormInput("");
  const serial = useFormInput("");
  const type = useFormInput("");
  const serverId = useFormInput("");
  const [redirect, setRedirect] = useState(false);
  const [listMoney, setlistMoney] = useState([]);
  const [listServer, setListServer] = useState({});

  const [amount, setamount] = useState(10000);
  const [severs, setsevers] = useState(1);
  const [tyrpes, setrtypes] = useState("viettel");
  const [show, setShow] = useState(false);
  const [transId, settransId] = useState(null);
  const handleClose = () => setShow(false);
  // handle button click of login form
  const handleCard = () => {
    const headers = {
      Authorization: localStorage.getItem("sessionId"),
    };

    axios
      .post(
        "https://ogid.daihaijsc.com/api/payment/mobile-charge",
        {
          money: amount - 0,
          code: code.value,
          serverId: parseInt(severs),
          serial: serial.value,
          type: tyrpes,
        },
        { headers: headers }
      )

      .then((response) => {
        const red = response.data;
        if (red.status != 0) {
          alert(red.message);
        } else {
          let transId = red.data;
          localStorage.setItem("transId ", transId);
          settransId(transId);
          setShow(true);
          // setIscalling(true);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get(
        "https://ogid.daihaijsc.com/api/charging-package?application_id=08dbd700-1f38-11eb-91ff-dab8a2794d67&charging_method=MOBILE_CHARGE",
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
  useEffect(() => {
    axios
      .get("https://ogid.daihaijsc.com/api/application_servers/ckcv", {})
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
  const [timer, setTimer] = useState(0);
  const increment = useRef(null);
  const handleStart = (transId) => {
    const headers = {
      Authorization: localStorage.getItem("sessionId"),
    };
    increment.current = setInterval(() => {
      axios
        .get("https://ogid.daihaijsc.com/api/transactions?id=" + transId, {
          headers: headers,
        })
        .then((response) => {
          const red = response.data;
          console.log("status=" + red.data.status);
          if (red.data.status != 0 && red.data.status != 1) {
            if (red.data.status == 2) {
              clearInterval(increment.current);
              window.location.href = "/congrats";
              setShow(false);
            } else {
              clearInterval(increment.current);
              window.location.href = "/error";
            }
          }
          // countCheck += 1;
        })
        .catch((error) => {
          // countCheck += 1;
        });
      setTimer((timer) => timer + 1);
    }, 30000);
  };
  useEffect(() => {
    if (timer >= 10) {
      clearInterval(increment.current);
    }
  }, [timer]);

  // useEffect(() => {
  //   if (iscalling) {
  //     handleStart();
  //   }
  // }, [iscalling]);
  useEffect(() => {
    if (transId != null) {
      handleStart(transId);
    }
  }, [transId]);
  const onChangeMoney = (event) => {
    setamount(event.target.value);
  };
  const onChangeSever = (event) => {
    setsevers(event.target.value);
  };
  const onChangeType = (event) => {
    setrtypes(event.target.value);
  };

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
                <p className="mt-1">
                  Người chơi sau khi nạp thành công đăng nhập vào game, chọn
                  đúng nhân vật để được cộng vàng vào nhân vật đó.
                </p>

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
                    {/* <div className="form-group">
                      <div className="form-group">
                        <label>Mời bạn chọn server</label>
                        <select
                          onChange={onChangeSever}
                          className="form-control"
                        >
                          {servers.map((s) => (
                            <option value={s.serverId}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                    </div> */}
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
                                <option key={key} value={item.serverId}>
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-group">
                        <label>Mời bạn chọn loại thẻ</label>
                        <select
                          onChange={onChangeType}
                          className="form-control"
                        >
                          {types.map((s) => (
                            <option value={s.key}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group">
                        <input
                          className="input form-control"
                          placeholder="Mã số thẻ cào"
                          type="number"
                          {...code}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-group">
                        <input
                          className="input form-control"
                          placeholder="Seri thẻ cào"
                          type="number"
                          {...serial}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-group">
                        <select
                          onChange={onChangeMoney}
                          dataSource={listMoney}
                          className="form-control"
                        >
                          {listMoney.length > 0 &&
                            listMoney.map((item, key) => {
                              return (
                                <option key={key} value={item.packageAmount}>
                                  {item.packageAmount}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <a onClick={handleCard} className="btn btn-pri btn-money" />
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
      <Modal show={show}>
        <Modal.Body>
          <div className="col-12">
            <div className="loader"></div>
            <p className="text-cm">Xin chờ trong giây lát....!</p>
          </div>
        </Modal.Body>
      </Modal>
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
export default CardMobile;
