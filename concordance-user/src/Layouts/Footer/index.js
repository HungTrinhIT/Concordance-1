import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top d-flex align-items-center">
          <div className="footer__logo">
            <img src="/images/cropped-Logo-v2.0.22.png" alt="logo-clc" />
          </div>
          <p>Concordance Website</p>
        </div>
        <div className="footer__bottom mt-2">
          <div className="row">
            <div className="col-4">
              <p className="footer__title">Contact</p>
              <div className="footer__item">
                <ul>
                  <li>
                    Address: room C44, Building C, 227 Nguyen Van Cu, District
                    5, Ho Chi Minh City, Vietnam.
                  </li>
                  <li>Phone number: (028) 66 849 856</li>
                  <li>Email: clc@hcmus.edu.vn</li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <p className="footer__title">About us</p>
              <div className="footer__item">
                <ul>
                  <li>
                    <p>Trịnh Vũ Minh Hùng</p>
                    <p>Email: minhhung.it99@gmail.com</p>
                  </li>
                  <li>
                    <p>Lê Hoài Bảo</p>
                    <p>Email: lehoaibao99@gmail.com</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <p className="footer__title">Partner</p>
              <div className="footer__item">
                <ul>
                  <li>COMPUTATIONAL LINGUISTICS CENTER</li>
                  <li>
                    <img
                      src="/images/cropped-Logo-v2.0.22.png"
                      alt="logo-clc"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__license">
          <p>© 2020 HB Team. All rights reserved.</p>
        </div>  
      </div>
    </footer>
  );
};

export default Footer;
