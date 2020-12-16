import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClickMomo = () => {
    const headers = {
      'Authorization': localStorage.getItem("sessionId")
    }
    axios
      .post("http://www.nganluong.vn/service/mobileCard/charge", {"merchant_id": 6211}, {
        headers: headers
      })
      .then((response) => {
        const red = response.data;
         window.location.href = red.data;
      })
      .catch((error) => {});
  };
  const handleClickCard = () => {
    const headers = {
      'Authorization': localStorage.getItem("sessionId")
    }
    axios
      .post("http://dev.ogid.daihaijsc.com/payment/atm-charge", {"amount": 10000}, {
        headers: headers
      })
      .then((response) => {
        const red = response.data;
         window.location.href = red.data;
      })
      .catch((error) => {});
  };
  return (
    <div>
      {/* Main Wrapper */}
      <div className="main main--ishopgo" role="main">
        {/*  Testimonial Section */}
        <div className="section section--video">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-xs-12 ">
                <div className="video ">
                  <iframe
                    width="68%"
                    height={355}
                    src="https://www.youtube.com/embed/Yq6AVQTuxss"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <button
                type="submit"
                onClick={handleShow}
                className="btn btn-pri btn-money"
              />
            </div>
            <div className="flex-icon pd-40">
              <div className="uti_body pd-5">
                <div className="icon">
                  <a href="/bank">
                    <img src="img/Fanpage.png" />
                  </a>
                </div>
              </div>
              <div className="uti_body pd-5">
                <div className="icon">
                  <a href="bank.html">
                    <img src="img/Google Play.png" />
                  </a>
                </div>
              </div>
              <div className="uti_body pd-5">
                <div className="icon">
                  <a href="bank.html">
                    <img src="img/App Store.png" />
                  </a>
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
      {/* line modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vui lòng chọn hình thức nạp tiền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12">
            <a onClick={handleClickMomo} className="btn btn-pri btn-momo" />
          </div>
          <div className="col-12">
            <a onClick={handleClickCard} className="btn btn-pri btn-card" />
          </div>
          <div className="col-12">
            <a href="bank.html" className="btn btn-pri btn-bank" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
