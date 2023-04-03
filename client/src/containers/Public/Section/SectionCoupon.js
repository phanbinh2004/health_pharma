import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CommonUtils from "../../../ultils/CommonUtils";
import "./Section.scss";
function SectionCoupon() {
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        CommonUtils.fireEventToasty(
          `Bạn đã copy thành công`,
          "Đoạn văn bản đã đc lưu vào clipboard",
          "success",
          "Ok"
        );
      })
      .catch((error) => {
        CommonUtils.fireEventToasty(
          `Oops...`,
          "Xảy ra lỗi trong khi copy, Hãy thử lại",
          "error",
          "Ok"
        );
        console.error("Error copying text to clipboard:", error);
      });
  };
  return (
    <section className="coupon-wrap">
      <div className="coupon-container">
        <div className="coupon-title">Khuyến mãi dành cho bạn</div>
        <div className="coupon-main">
          <div className="col-12 col-md-6 col-xl-3 coupon-item">
            <div className="coupon-item-inner">
              <div className="coupon-item-left">
                <div className="box-img">
                  <span className="box-img-inner">
                    <img
                      className="img"
                      src="//theme.hstatic.net/200000599309/1000947063/14/home_coupon_1_img.png?v=666"
                      alt="Miễn phí vận chuyển"
                    />
                  </span>
                </div>
              </div>
              <div className="coupon-item-right">
                <button className="info">
                  <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                </button>
                <div className="item-top">
                  <h3>Giảm 20%</h3>
                  <p>Đơn hàng từ 200k</p>
                </div>
                <div className="item-bottom">
                  <div className="bottom-details">
                    <p>
                      Mã: <strong>QH5G8J0Y</strong>
                    </p>
                    <p>HSD: 5/05/2023</p>
                  </div>
                  <div className="bottom-btn">
                    <button
                      className="button"
                      onClick={() => handleCopy("QH5G8J0Y")}
                    >
                      Sao chép mã
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3 coupon-item">
            <div className="coupon-item-inner">
              <div className="coupon-item-left">
                <div className="box-img">
                  <span className="box-img-inner">
                    <img
                      className="img"
                      src="https://theme.hstatic.net/200000599309/1000947063/14/home_coupon_2_img.png?v=666"
                      alt="Miễn phí vận chuyển"
                    />
                  </span>
                </div>
              </div>
              <div className="coupon-item-right">
                <button className="info">
                  <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                </button>
                <div className="item-top">
                  <h3>Giảm 50k</h3>
                  <p>Đơn hàng từ 500k</p>
                </div>
                <div className="item-bottom">
                  <div className="bottom-details">
                    <p>
                      Mã: <strong>FT45YUO8H</strong>
                    </p>
                    <p>HSD: 12/04/2023</p>
                  </div>
                  <div className="bottom-btn">
                    <button
                      className="button"
                      onClick={() => handleCopy("FT45YUO8H")}
                    >
                      Sao chép mã
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3 coupon-item">
            <div className="coupon-item-inner">
              <div className="coupon-item-left">
                <div className="box-img">
                  <span className="box-img-inner">
                    <img
                      className="img"
                      src="https://theme.hstatic.net/200000599309/1000947063/14/home_coupon_3_img.png?v=666"
                      alt="Miễn phí vận chuyển"
                    />
                  </span>
                </div>
              </div>
              <div className="coupon-item-right">
                <button className="info">
                  <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                </button>
                <div className="item-top">
                  <h3>Giảm 10%</h3>
                  <p>Đơn hàng từ 100k</p>
                </div>
                <div className="item-bottom">
                  <div className="bottom-details">
                    <p>
                      Mã: <strong>A789UYT</strong>
                    </p>
                    <p>HSD: 7/05/2023</p>
                  </div>
                  <div className="bottom-btn">
                    <button
                      className="button"
                      onClick={() => handleCopy("A789UYT")}
                    >
                      Sao chép mã
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3 coupon-item">
            <div className="coupon-item-inner">
              <div className="coupon-item-left">
                <div className="box-img">
                  <span className="box-img-inner">
                    <img
                      className="img"
                      src="https://theme.hstatic.net/200000599309/1000947063/14/home_coupon_4_img.png?v=666"
                      alt="Giảm 10%"
                    />
                  </span>
                </div>
              </div>
              <div className="coupon-item-right">
                <button className="info">
                  <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                </button>
                <div className="item-top">
                  <h3>Miễn phí vận chuyển</h3>
                  <p>Đơn hàng từ 300k</p>
                </div>
                <div className="item-bottom">
                  <div className="bottom-details">
                    <p>
                      Mã: <strong>A87TYRT55</strong>
                    </p>
                    <p>HSD: 10/04/2022</p>
                  </div>
                  <div className="bottom-btn">
                    <button
                      className="button"
                      onClick={() => handleCopy("A87TYRT55")}
                    >
                      Sao chép mã
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionCoupon;
