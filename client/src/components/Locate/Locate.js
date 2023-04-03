import "./Locate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Locate(props) {
  return (
    <div className="locate-wrap">
      <div className="locate-content">
        <div className="locate-container">
          <button
            className="locate-close"
            onClick={() => {
              props.callBackFunction(!props.isOpen, "locate");
            }}
          >
            <FontAwesomeIcon icon={faTimes} className="icon" />
          </button>
          <div className="locate-title">
            <span className="txt-title">Khu vực mua hàng</span>
          </div>
          <div className="locate-main">
            <div className="filter-address">
              <div className="filter-select">
                <div className="select-item">
                  <label htmlFor="filter-province">Tỉnh/Thành</label>
                  <div className="field-select">
                    <select className="filter-province" id="filter-province">
                      <option value="null">- Chọn tỉnh thành phố -</option>
                      <option value="HaNoi">Hà Nội</option>
                      <option value="HoChiMinh">Hồ chí minh</option>
                    </select>
                  </div>
                </div>
                <div className="select-item">
                  <label htmlFor="filter-district">Quận/Huyện</label>
                  <div className="field-select">
                    <select className="filter-district" id="filter-district">
                      <option value="null">- Chọn quận huyện -</option>
                      <option value="HaNoi">Hà Nội</option>
                      <option value="HoChiMinh">Hồ chí minh</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Fetch data load động */}
            <div className="choose-address">
              Giao hoặc đến lấy tại:
              <br />
              <span className="choose-address-view">
                Cửa hàng Nguyễn Trãi - 256 Nguyễn Trãi, Phường Nguyễn Cư Trinh,
                Quận 1
              </span>
            </div>
            <div className="province-address">
              <div className="address-here">
                Chọn cửa hàng gần bạn nhất để tối ưu chi phí giao hàng. Hoặc đến
                lấy hàng
              </div>
              <ul className="list-address">
                <li className="item-address">
                  <span className="item-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                  <div className="item-info">
                    <span className="address-name">Địa điểm mặc định</span>
                    <br />
                    "183 lê đại hành"
                  </div>
                </li>
                <li className="item-address">
                  <span className="item-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                  <div className="item-info">
                    <span className="address-name">Địa điểm mặc định</span>
                    <br />
                    "183 lê đại hành"
                  </div>
                </li>
                <li className="item-address">
                  <span className="item-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                  <div className="item-info">
                    <span className="address-name">Địa điểm mặc định</span>
                    <br />
                    "183 lê đại hành"
                  </div>
                </li>
                <li className="item-address">
                  <span className="item-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                  <div className="item-info">
                    <span className="address-name">Địa điểm mặc định</span>
                    <br />
                    "183 lê đại hành"
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Locate;
