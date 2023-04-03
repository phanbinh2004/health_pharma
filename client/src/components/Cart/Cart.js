import "./Cart.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { path } from "../../ultils/constants";
function Cart(props) {
  const [sumProduct, setSumProduct] = useState(0);
  let [countProduct, setCountProduct] = useState(1);
  const decrease = () => {
    if (countProduct === 1) {
      return;
    } else {
      setCountProduct(countProduct - 1);
    }
  };
  const increase = () => {
    setCountProduct(countProduct + 1);
  };

  return (
    <div className="overlay">
      <div className="cart-modal">
        <div className="cart-container animation">
          <div className="cart-header">
            <span className="cart-title">Giỏ hàng</span>
            <button
              className="cart-close"
              onClick={() => {
                props.callBackFunction(!props.isOpen, "cart");
              }}
            >
              <FontAwesomeIcon icon={faTimes} className="icon" />
            </button>
          </div>
          <div className="cart-shipping">
            <div className="shipping-title">
              Bạn cần mua thêm <span className="price">500,000₫</span> để được{" "}
              <span className="free-ship">miễn phí vận chuyển</span>
            </div>
          </div>
          <div className="cart-view-product">
            <div
              className={sumProduct !== 0 ? "cart-product" : "cart-no-product"}
            >
              {sumProduct === 0 ? (
                <table className="table-cart-view">
                  <tbody>
                    <tr className="mini-cart__empty">
                      <td>
                        <div className="svgico-mini-cart">
                          <img
                            className=" lazyloaded"
                            data-src="//theme.hstatic.net/200000599309/1000947063/14/cart_noProduct_img.png?v=666"
                            src="//theme.hstatic.net/200000599309/1000947063/14/cart_noProduct_img.png?v=666"
                            alt="Giỏ hàng của bạn đang trống"
                          />
                        </div>
                        Hiện chưa có sản phẩm trong giỏ hàng ...
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className="cart-view-scroll">
                  <table className="table-cart-view-product">
                    <tbody>
                      <tr className="mini-cart-item">
                        <td className="mini-cart-left">
                          <Link to="" className="link-product">
                            <img
                              src=" //product.hstatic.net/200000599309/product/product-16_1_9af7650e4878486681caa36c6c643f6a_small.jpg "
                              alt="Đai lưng Pro Hard Slim Bonbone hỗ trợ cột sống"
                            />
                          </Link>
                        </td>
                        <td className="mini-cart-right">
                          <span className="mini-cart-title">
                            Bình xịt mũi muối biển Nano Sea Spray Phương Nam hỗ
                            trợ tai mũi họng (75ml)
                          </span>
                          <div className="mini-cart-quatity">
                            <button
                              className="cart-decrease"
                              onClick={decrease}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="count-product"
                              value={countProduct}
                              onChange={(e) => {
                                setCountProduct(e.target.value);
                              }}
                            />
                            <button
                              className="cart-increase"
                              onClick={increase}
                            >
                              +
                            </button>
                          </div>
                          <div className="mini-cart-price">290.000₫</div>
                          <button className="mini-cart-remove">
                            <FontAwesomeIcon icon={faTimes} className="icon" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="cart-view-line"></div>
            <div className="cart-view-total">
              <table className="table-total">
                <tbody>
                  <tr>
                    <td className="total-price">TỔNG TIỀN:</td>
                    <td className="view-total-price">4,750,000₫</td>
                  </tr>
                  <tr className="mini-cart-check-total">
                    <td
                      colSpan="2"
                      className="summary-alert alert alert-danger d-none"
                    >
                      Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để thanh
                      toán.
                    </td>
                  </tr>

                  <tr className="mini-cart__button">
                    <td colSpan="2" className="btn-check">
                      <button className="check-out">Thanh toán</button>
                    </td>
                  </tr>
                  <tr className="mini-cart__link">
                    <td>
                      <Link
                        to={path.CART}
                        className="linktocart"
                        onClick={() => {
                          props.callBackFunction(!props.isOpen, "cart");
                        }}
                      >
                        Xem giỏ hàng
                      </Link>
                    </td>
                    <td>
                      <Link to="" className="linkcoupon">
                        Khuyến mãi cho bạn
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
