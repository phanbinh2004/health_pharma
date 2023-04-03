import { Link } from "react-router-dom";
import { path } from "../../ultils/constants";
import { connect } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import * as actions from "../../store/actions";
import "./Cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faEye,
  faInfoCircle,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback, useContext } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import {
  handleGetAllProductCart,
  handleDeleteProductFromCart,
} from "../../services/userServices";
import CommonUtils from "../../ultils/CommonUtils";
import SectionSlider from "../../containers/Public/Section/SectionSlider";
function MyOrder(props) {
  const [cart, setCart] = useState([]);
  const [tranfer, setTranfer] = useState("Giao khi có hàng");
  const [secondSelectValue, setSecondSelectValue] = useState();
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(false);
  const [total, setTotal] = useState(0);
  const [deletePro, setDeletePro] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [firstSelectValue, setFirstSelectValue] = useState("");
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [disableSelect2, setDisableSelect2] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const pathName = window.location.pathname;
  let toVnd = new Intl.NumberFormat();
  const { userInfo, products } = props;
  useEffect(() => {
    let totalValue = cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    let totalQuantity = cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity;
    }, 0);
    totalValue = Number.parseInt(totalValue * 1000);
    setTotal(totalValue);
    setTotalQuantity(totalQuantity);
  }, [cart]);
  useEffect(() => {
    if (total > 500000) {
      setProgress(100);
    } else {
      setProgress((total / 500000) * 100);
    }
  }, [total]);
  function getNextDate(daysToAdd) {
    const today = new Date();
    const nextDate = new Date(
      today.getTime() + daysToAdd * 24 * 60 * 60 * 1000
    );
    const day = nextDate.getDate().toString().padStart(2, "0");
    const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
    const year = nextDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  const day = getNextDate();
  const tomorrowDate = getNextDate(1);
  const dayAfterTomorrow = getNextDate(2);
  useEffect(() => {
    const fetchProduct = async () => {
      let dataProductCart = await handleGetAllProductCart(userInfo?.id);
      if (dataProductCart && dataProductCart.errCode === 0) {
        let listProduct = dataProductCart?.products;
        setCart(listProduct);
      }
    };
    fetchProduct();
  }, [userInfo?.id, deletePro]);
  function getOptionsForSelectedValue(selectedValue) {
    switch (selectedValue) {
      case "A":
        return ["08:00-09:00", "09:00-10:00", "10:00-11:00"];
      case "B":
        return ["08:00-09:00", "09:00-10:00", "10:00-11:00"];
      case "C":
        return ["08:00-09:00", "09:00-10:00", "10:00-11:00"];
      default:
        return [];
    }
  }
  useEffect(() => {
    const options = getOptionsForSelectedValue(firstSelectValue);
    setSecondSelectOptions(options);
  }, [firstSelectValue]);

  function handleFirstSelectChange(event) {
    let option = event.target.value;
    setFirstSelectValue(option);
    if (option === "A") {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 11) {
        setDisableSelect2(true);
      } else {
        setDisableSelect2(false);
      }
    } else {
      setDisableSelect2(false);
    }
  }
  function handleSecondSelectChange(event) {
    const value = event.target.value;
    setSecondSelectValue(value);
  }
  const handleDeleteCart = async (userId, keyProduct) => {
    let res = await handleDeleteProductFromCart(userId, keyProduct);
    if (res.errCode === 0) {
      CommonUtils.fireEventToasty(
        "Xoá thành công",
        "Sản phẩm đẫ bị xoá khỏi giỏ hàng",
        "success",
        "Ok"
      );
      setDeletePro(Math.floor(Math.random() * 10000));
    } else {
      CommonUtils.fireEventToasty(
        "Xoá không thành công",
        "Có vẻ đag gặp sự cố hãy thử lại sau",
        "error",
        "Ok"
      );
    }
  };
  const handleDecrease = (id) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const index = updatedCart.findIndex((item) => item.id === id);
      if (index !== -1) {
        if (updatedCart[index].quantity > 1) {
          updatedCart[index].quantity -= 1;
        } else {
          let isDelete = window.confirm("Bạn có muốn xoá sản phẩm này không!");
          if (isDelete) {
            handleDeleteCart(cart[index].userId, cart[index].keyProduct);
          }
        }
      }
      return updatedCart;
    });
  };
  const handleIncrease = (id) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const index = updatedCart.findIndex((item) => item.id === id);
      if (index !== -1) {
        updatedCart[index].quantity += 1;
      }
      return updatedCart;
    });
  };
  const handleDayTransfer = () => {
    if (!secondSelectValue) {
      CommonUtils.fireEventToasty(
        `Oops...!`,
        "Bạn cần phải chọn đủ ngày và giờ",
        "warning",
        "Ok"
      );
    } else {
      setChecked(false);
      if (firstSelectValue === "A") {
        setTranfer(`${day} ${secondSelectValue}`);
      } else if (firstSelectValue === "B") {
        setTranfer(`${tomorrowDate} ${secondSelectValue}`);
      } else if (firstSelectValue === "C") {
        setTranfer(`${dayAfterTomorrow} ${secondSelectValue}`);
      }
    }
  };
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
  useEffect(() => {
    props.getAllProduct("ALL");
  }, []);
  let YouLikeProducts = products.filter((item) => {
    return Number.parseInt(item.discount) > 0;
  });
  const handleFilter = (categories) => {
    const filtered = products.filter((product) =>
      categories.includes(product.category)
    );
    setFilteredProducts(filtered);
  };
  console.log(cart);
  return (
    <main className="main">
      <div className="layout-cart">
        <div className="wrap-cart">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12 content-details">
              <div className="main-content">
                <div className="cart-heading">
                  <h1>Giỏ hàng của bạn</h1>
                  <p>
                    Bạn đang có{" "}
                    <strong className="count-cart">
                      {totalQuantity} sản phẩm
                    </strong>{" "}
                    trong giỏ hàng
                  </p>
                  <div className="siteCart-shipping  cart-shipping-free ">
                    <div className="shipping-title">
                      {total >= 500000 ? "Bạn đã được " : `Bạn cần mua thêm `}
                      {total < 500000 && (
                        <>
                          <span className="price">
                            {toVnd.format(500000 - total)}₫
                          </span>
                          {" để được "}
                        </>
                      )}
                      <span className="free-ship">miễn phí vận chuyển</span>
                    </div>
                    <div className="shipping-bar">
                      <span
                        style={{
                          backgroundColor:
                            progress === 100 ? "#3d9851" : "#ffbc11",
                          width: `${progress}%`,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="list-product">
                  <div className="cart">
                    <div className="cart-row">
                      <div className="table-cart">
                        {cart.map((item, index) => {
                          let arr = item.thumbnail;
                          let arrayLink = JSON.parse(item.thumbnail);
                          let arrayLink2 = arr.split(",");
                          let priceVND = toVnd.format(item?.price * 1000);
                          let discountVND = CommonUtils.handleDiscount(
                            item?.price,
                            item?.discount
                          );
                          let oldVND = toVnd.format(discountVND?.price * 1000);
                          return (
                            <div className="media-line" key={index}>
                              <div className="media-left">
                                <div className="item-img">
                                  <img
                                    src={arrayLink[0]}
                                    alt="avatar product"
                                  />
                                </div>
                                <div className="item-remove">
                                  <button
                                    onClick={() =>
                                      handleDeleteCart(
                                        cart[index].userId,
                                        cart[index].keyProduct
                                      )
                                    }
                                  >
                                    xoá
                                  </button>
                                </div>
                              </div>
                              <div className="media-right">
                                <div className="item-info">
                                  <h3 className="item-title">{item.name}</h3>
                                </div>
                                <div className="item-price">
                                  <p>
                                    {item?.discount && <span>{oldVND}₫</span>}

                                    <del>{priceVND}₫</del>
                                  </p>
                                </div>
                              </div>
                              <div className="media-total">
                                <div className="item-total">
                                  <div className="price">
                                    {toVnd.format(
                                      cart[index].price *
                                        cart[index].quantity *
                                        1000
                                    )}
                                    ₫
                                  </div>
                                </div>
                                <div className="item-qty">
                                  <button
                                    className="btn-subtract"
                                    onClick={() => {
                                      handleDecrease(item.id);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faMinus}
                                      className="icon"
                                    />
                                  </button>
                                  <input
                                    disabled
                                    type="text"
                                    size="4"
                                    value={cart[index].quantity}
                                  />
                                  <button
                                    className="btn-plus"
                                    onClick={() => {
                                      handleIncrease(item.id);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      className="icon"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="cart-row">
                      <div className="order-note">
                        <div className="input-note">
                          <label htmlFor="note" className="note-label">
                            Ghi chú đơn hàng
                          </label>
                          <textarea
                            className="form-control"
                            id="note"
                            name="note"
                            rows="5"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collection-cart">
                <h2>Có thể bạn thích</h2>
                <div className="box-product">
                  <SectionSlider type="sale" view="4">
                    {YouLikeProducts?.map((item, index) => {
                      let priceCurr = CommonUtils.handleDiscount(
                        item.price,
                        item.discount
                      );
                      let priceOld = toVnd.format(item.price * 1000);
                      let saleBox = Number.parseInt(priceCurr.discount);
                      priceCurr = toVnd.format(
                        Math.ceil(priceCurr.price) * 1000
                      );
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
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="icon"
                                  />
                                </span>
                              </Link>
                              <div className="product-details">
                                <div className="details-top">
                                  <div className="vendor">
                                    <span>{item.brand}</span>
                                  </div>
                                </div>
                                <span className="description">
                                  {item.title}
                                </span>
                                <div className="variant"></div>
                                <div className="price">
                                  <div className="price-box">
                                    <span className="price-curr">
                                      {priceCurr}₫
                                    </span>
                                    <br />
                                    <span className="price-old">
                                      {priceOld}₫
                                    </span>
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
                                      <span className="btn-add">
                                        Thêm giỏ hàng
                                      </span>
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
            <div className="col-lg-4 col-md-12 col-12 sidebar-cart">
              <div className="wrap-order">
                <div className="order-block">
                  <h2 className="summary-title">Thông tin đơn hàng</h2>
                  <div className="summary-time">
                    <div className="summary-time_row">
                      <div className="boxtime-title">
                        <p className="txt-title">Thời gian giao hàng</p>
                        <p className="txt-time ">
                          <FontAwesomeIcon icon={faClock} className="icon" />
                          <span>{tranfer}</span>
                        </p>
                      </div>
                      <div className="boxtime-radio" id="picktime_radio">
                        <div className="radio-item">
                          <input
                            className="input-radio"
                            type="radio"
                            name="timeRadios"
                            id="timeRadios-1"
                            onChange={() => {
                              setChecked(false);
                              setTranfer("Giao khi có hàng");
                            }}
                          />
                          <label className="label-radio" htmlFor="timeRadios-1">
                            Giao khi có hàng
                          </label>
                        </div>
                        <div className="radio-item">
                          <input
                            className="input-radio"
                            type="radio"
                            name="timeRadios"
                            id="timeRadios-2"
                            onChange={() => {
                              setChecked(true);
                            }}
                          />
                          <label className="label-radio" htmlFor="timeRadios-2">
                            Chọn thời gian
                          </label>
                        </div>
                      </div>
                    </div>
                    {checked && (
                      <div className="summary-time_row pick-selected">
                        <div className="boxtime-select">
                          <div className="select-choose">
                            <div className="select-box date-option">
                              <label>Ngày giao</label>
                              <div className="select-option">
                                <select
                                  id="date_shipping"
                                  value={firstSelectValue}
                                  onChange={handleFirstSelectChange}
                                >
                                  <option value="A">Hôm nay</option>
                                  <option value="B">{tomorrowDate}</option>
                                  <option value="C">{dayAfterTomorrow}</option>
                                </select>
                              </div>
                            </div>
                            <div className="select-box time-option">
                              <label>Thời gian giao</label>
                              <div className="select-option">
                                <select
                                  id="time_shipping"
                                  value={secondSelectValue}
                                  onChange={handleSecondSelectChange}
                                >
                                  {secondSelectOptions.map((optionValue) => (
                                    <option
                                      disabled={disableSelect2}
                                      key={optionValue}
                                      value={optionValue}
                                    >
                                      {optionValue}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="select-btn">
                            <button
                              className="btn-accepttime disabled"
                              id="btn-cart-accepttime"
                              disabled={disableSelect2}
                              onClick={handleDayTransfer}
                            >
                              Xác nhận thời gian
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="summary-total">
                    <p>
                      Tổng tiền: <span>{toVnd.format(total)}₫</span>
                    </p>
                  </div>
                  <div className="summary-action">
                    <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
                    <p>
                      Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                    </p>{" "}
                    {total < 100000 && (
                      <div className="summary-alert alert alert-danger ">
                        Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để thanh
                        toán.
                      </div>
                    )}
                  </div>
                  <div className="summary-button">
                    <Link
                      id="btnCart-checkout "
                      className={
                        total < 100000
                          ? "checkout-btn btnred disabled"
                          : "checkout-btn btnred"
                      }
                      to={path.PAY}
                    >
                      THANH TOÁN
                    </Link>
                  </div>
                </div>
                <div className="order-block order-notify">
                  <div className="summary-warning alert-order">
                    <p className="textmr">
                      <strong>Chính sách mua hàng</strong>:
                    </p>
                    <p>
                      Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá
                      trị tối thiểu <strong>100.000₫ </strong> trở lên.
                    </p>
                  </div>
                </div>
                <div className="order-block sale">
                  <div className="col-12 coupon-item">
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
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="icon"
                          />
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
                  <div className="col-12 coupon-item">
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
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="icon"
                          />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    products: state.app.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    getAllProduct: (id) => {
      dispatch(actions.getAllProduct(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
//
