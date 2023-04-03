import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonUtils from "../../../ultils/CommonUtils";
import SectionSlider from "./SectionSlider";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
function SectionTopSell(props) {
  const [product, setProduct] = useState();
  useEffect(() => {
    props.getAllProduct("ALL");
  }, []);
  const { products, userInfo } = props;
  let saleProducts = products.filter((item) => {
    return Number.parseInt(item.price) > 250;
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
    <>
      <section className="sell-wrap">
        <div className="sell-container">
          <div className="sell-heading">
            <h2 className="sell-title">Sản phẩm bán chạy</h2>
          </div>
          <div className="list-product">
            <div className="box-product">
              <SectionSlider>
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
                                {saleBox > 0 && (
                                  <span className="price-curr">
                                    {priceCurr}₫
                                  </span>
                                )}
                                <br />
                                <span
                                  className={
                                    saleBox > 0
                                      ? "price-old"
                                      : "price-old decoration"
                                  }
                                >
                                  {priceOld}₫
                                </span>
                              </div>
                              {saleBox > 0 && (
                                <div className="sale-box">-{saleBox}%</div>
                              )}
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
          </div>
        </div>
      </section>
      <section className="banner-wrap">
        <div className="banner-container">
          <div className="row banner-inner">
            <div className="col-lg-3 col-md-6 col-6 banner-content">
              <div className="banner-img">
                <Link to="">
                  <img
                    src="https://theme.hstatic.net/200000599309/1000947063/14/home_group_banner_1_img.jpg?v=666"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6 banner-content">
              <div className="banner-img">
                <Link to="">
                  <img
                    src="https://theme.hstatic.net/200000599309/1000947063/14/home_group_banner_2_img.jpg?v=666"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6 banner-content">
              <div className="banner-img">
                <Link to="">
                  <img
                    src="https://theme.hstatic.net/200000599309/1000947063/14/home_group_banner_3_img.jpg?v=666"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6 banner-content">
              <div className="banner-img">
                <Link to="">
                  <img
                    src="https://theme.hstatic.net/200000599309/1000947063/14/home_group_banner_4_img.jpg?v=666"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(SectionTopSell);
