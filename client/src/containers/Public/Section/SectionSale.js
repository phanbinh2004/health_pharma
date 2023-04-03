import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faCartPlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import SectionSlider from "./SectionSlider";

import * as actions from "../../../store/actions";
import { useEffect } from "react";
import CommonUtils from "../../../ultils/CommonUtils";
// Renderer callback with condition
function SectionSale(props) {
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="time-group">
        <div className="time-day time">
          <div className="time-inner">
            <span className="time-value">{days}</span>
            <span className="time-title">Ngày</span>
          </div>
        </div>
        <div className="time-hour time">
          <div className="time-inner">
            <span className="time-value">{hours}</span>
            <span className="time-title">Giờ</span>
          </div>
        </div>
        <div className="time-minute time">
          <div className="time-inner">
            <span className="time-value">{minutes}</span>
            <span className="time-title">Phút</span>
          </div>
        </div>
        <div className="time-second time">
          <div className="time-inner">
            <span className="time-value">{seconds}</span>
            <span className="time-title">Giây</span>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    props.getAllProduct("ALL");
  }, []);
  const { products, userInfo } = props;
  let saleProducts = products.filter((item) => {
    return Number.parseInt(item.discount) > 0;
  });
  const hanldeAddToCart = async (keyProduct) => {
    let product = products.filter((item) => {
      return item.keyProduct === keyProduct;
    });
    product[0].userId = userInfo?.id;
    product[0].quantity = 1;
    let res = await CommonUtils.handleAddCart(product[0]);
    if (res.errCode === 0) {
      CommonUtils.fireEventToasty(
        "Good job!",
        "Bạn đã thêm sản phẩm thành công",
        "success",
        "Cool"
      );
    } else {
      CommonUtils.fireEventToasty("Oops...", res.errMessage, "error", "So bad");
    }
  };
  let toVnd = new Intl.NumberFormat();
  return (
    <section className="sale-wrap">
      <div className="sale-container">
        <div className="sale-main">
          <div className="box-list">
            <div className="box-heading">
              <h2 className="box-title">Giảm giá mỗi ngày</h2>
              <div className="box-countdown">
                <div className="count-down">
                  {
                    <Countdown
                      date={Date.now() + 50000000}
                      renderer={renderer}
                      autoStart={true}
                    />
                  }
                </div>
              </div>
            </div>
            <div className="box-product">
              <SectionSlider type="sale">
                {saleProducts?.map((item, index) => {
                  let priceCurr = CommonUtils.handleDiscount(
                    item.price,
                    item.discount
                  );
                  let priceOld = toVnd.format(item.price * 1000);
                  let saleBox = Number.parseInt(priceCurr.discount);
                  priceCurr = toVnd.format(Math.ceil(priceCurr.price) * 1000);
                  let arrayLink = JSON.parse(item.thumbnail);
                  return (
                    <div className="product-item" key={index}>
                      <div className="product-loop">
                        <div className="product-inner">
                          <Link
                            to={`/product/${item.keyProduct}/${item.id}`}
                            key={index}
                            className="product-image"
                          >
                            <div className="full-img">
                              <div
                                className="first-img"
                                style={{
                                  backgroundImage: `url(${arrayLink[0]})`,
                                }}
                              ></div>
                              <div
                                className="second-img"
                                style={{
                                  backgroundImage: arrayLink[1]
                                    ? `url(${arrayLink[1]})`
                                    : `url(${arrayLink[0]})`,
                                }}
                              ></div>
                            </div>
                            <span className="eye">
                              <FontAwesomeIcon icon={faEye} className="icon" />
                            </span>
                          </Link>
                          <div className="product-details">
                            <div className="details-top">
                              <div className="vendor">
                                <span>{item.brand}</span>
                              </div>
                            </div>
                            <span className="description">{item.title}</span>
                            <div className="variant"></div>
                            <div className="price">
                              <div className="price-box">
                                <span className="price-curr">{priceCurr}₫</span>
                                <br />
                                <span className="price-old">{priceOld}₫</span>
                              </div>
                              <div className="sale-box">-{saleBox}%</div>
                            </div>
                            <div className="actions">
                              <div className="actions-inner">
                                <button
                                  type="submit"
                                  className="btn-cart"
                                  onClick={() =>
                                    hanldeAddToCart(item.keyProduct)
                                  }
                                >
                                  <span className="btn-add">Thêm giỏ hàng</span>
                                  <span className="btn-icon">
                                    <FontAwesomeIcon
                                      icon={faCartPlus}
                                      className="icon"
                                    />
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </SectionSlider>
            </div>
            <div className="box-all">
              <Link to={"/category/Sản phẩm giảm giá/9"} className="box-link">
                Xem tất cả GIẢM GIÁ MỖI NGÀY
                <FontAwesomeIcon
                  icon={faArrowAltCircleRight}
                  className="icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.app.product,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) => {
      dispatch(actions.userLoginSuccess(userInfo));
    },
    getAllProduct: (id) => {
      dispatch(actions.getAllProduct(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SectionSale);
