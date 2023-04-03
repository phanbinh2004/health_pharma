import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import * as actions from "../../store/actions";
import { handleGetAllProduct } from "../../services/userServices";
import { path } from "../../ultils/constants";
import "./DetailProduct.scss";
import SectionSlider from "../../containers/Public/Section/SectionSlider";
import CommonUtils from "../../ultils/CommonUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
function DetailProduct(props) {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [arrThumb, setArrThumb] = useState();
  const [active, setAcctive] = useState(1);
  const [count, setCount] = useState(1);
  useEffect(() => {
    async function fetchProduct() {
      const data = await handleGetAllProduct(id);
      setProduct(data.products);
      setArrThumb(JSON.parse(data?.products?.thumbnail));
    }
    fetchProduct();
  }, [id]);
  let toVnd = new Intl.NumberFormat();
  let priceVND = toVnd.format(product?.price * 1000);
  let discountVND = CommonUtils.handleDiscount(
    product?.price,
    product?.discount
  );
  let oldVND = toVnd.format(discountVND?.price * 1000);
  const handleSetActive = (index) => {
    setAcctive(index);
  };
  const handleAddProductToCart = async () => {
    product.userId = props?.userInfo?.id;
    product.quantity = count;
    let res = await CommonUtils.handleAddCart(product);
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
  const handlePrev = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handlePlus = () => {
    setCount(count + 1);
  };
  return (
    <section className="product-detail-wrap">
      <div className="product-detail">
        <div className="breadcrumb-list">
          <ul className="list-nav">
            <li>
              <Link to={path.HOME}>Trang chủ {"  /"}</Link>
            </li>
            <li>
              <Link>
                {"  "}Sản phẩm {"  /"}
              </Link>
            </li>
            <li>
              <Link>
                {"  "}
                {product?.title}
              </Link>
            </li>
          </ul>
        </div>
        <div className="product-info">
          <div className="product-gallery">
            <div className="gallery-container">
              <div className="thumb-carousel">
                <SectionSlider view={1} dots={true} button={true}>
                  {arrThumb?.map((item, index) => (
                    <div className="slide-img" key={index}>
                      <div className="img-inner">
                        <img src={item} alt="thumb" />
                      </div>
                    </div>
                  ))}
                </SectionSlider>
                <p className="undert">
                  Sản phẩm 100% chính hãng, mẫu mã có thể thay đổi theo lô hàng
                </p>
              </div>
              <div className="control-carousel">
                {arrThumb?.map((item, index) => (
                  <figure className="control-item" key={index}>
                    <img src={item} alt="thumb" />
                  </figure>
                ))}
              </div>
            </div>
          </div>
          <div className="product-content">
            <div className="content-container">
              <div className="product-header">
                <h1>{product?.title}</h1>
                <div className="detail">
                  <span className="key-product">
                    Mã sản phẩm:
                    <strong>{product?.keyProduct}</strong>
                  </span>
                  <span className="status-product">
                    Tình trạng:
                    <strong>{"Còn hàng"}</strong>
                  </span>
                  <span className="brand-product">
                    Thương hiệu
                    <strong>{product?.brand}</strong>
                  </span>
                </div>
              </div>
              <div className="product-body">
                <div className="body-left">
                  <div className="product-price">
                    <p className="pro-price">{oldVND}₫</p>
                    {product?.discount && <del>{priceVND}₫</del>}
                    {product?.discount && (
                      <span className="pro-percent">
                        -{discountVND?.discount}
                      </span>
                    )}
                  </div>

                  <div className="product-actions">
                    <div className="select-options">
                      <div className="quantity-area">
                        <div className="quantity-title">Số lượng:</div>
                        <button className="btn-subtract">
                          <FontAwesomeIcon
                            icon={faMinus}
                            className="icon"
                            onClick={handlePrev}
                          />
                        </button>
                        <input type="text" size="4" value={count} disabled />
                        <button className="btn-plus">
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="icon"
                            onClick={handlePlus}
                          />
                        </button>
                      </div>
                      <div className="addcart-area">
                        <button
                          className="add-cart"
                          onClick={handleAddProductToCart}
                        >
                          Thêm vào giỏ
                        </button>
                        <button className="buy-now">Mua ngay</button>
                      </div>
                    </div>
                  </div>
                  <div className="row product-deliverly">
                    <div className="col-lg-6 col-md col-12 deliverly-inner">
                      <div className="title-deliverly">
                        <span>Chính sách bán hàng</span>
                      </div>
                      <div className="infoList-deliverly">
                        <div className="deliverly-item">
                          <span>
                            <img
                              src="https://theme.hstatic.net/200000599309/1000947063/14/product_deliverly_1_ico.png?v=666"
                              alt="Cam kết 100% chính hãng"
                            />
                          </span>
                          Cam kết 100% chính hãng
                        </div>
                        <div className="deliverly-item">
                          <span>
                            <img
                              src="https://theme.hstatic.net/200000599309/1000947063/14/product_deliverly_2_ico.png?v=666"
                              alt="Miễn phí giao hàng"
                            />
                          </span>
                          Miễn phí giao hàng
                        </div>
                        <div className="deliverly-item">
                          <span>
                            <img
                              src="https://theme.hstatic.net/200000599309/1000947063/14/product_deliverly_3_ico.png?v=666"
                              alt="Hỗ trợ 24/7"
                            />
                          </span>
                          Hỗ trợ 24/7
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md col-12 deliverly-inner">
                      <div className="title-deliverly">
                        <span>Thông tin thêm</span>
                      </div>
                      <div className="infoList-deliverly">
                        <div className="deliverly-item">
                          <span>
                            <img
                              src="https://theme.hstatic.net/200000599309/1000947063/14/product_deliverly_4_ico.png?v=666"
                              alt="Hoàn tiền 100% nếu hàng giả"
                            />
                          </span>
                          Hoàn tiền 100% nếu hàng giả
                        </div>
                        <div className="deliverly-item">
                          <span>
                            <img
                              src="https://theme.hstatic.net/200000599309/1000947063/14/product_deliverly_4_ico.png?v=666"
                              alt="Hoàn tiền 100% nếu hàng giả"
                            />
                          </span>
                          Mở hộp kiểm tra
                        </div>
                        <div className="deliverly-item">
                          <span>
                            <img
                              src="https://theme.hstatic.net/200000599309/1000947063/14/product_deliverly_6_ico.png?v=666"
                              alt="Hỗ trợ 24/7"
                            />
                          </span>
                          Đổi trả trong 7 ngày
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="body-right">
                  <div className="right-brand">
                    <div className="brand-header">
                      <div className="left-header">
                        <img
                          src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/brand-images/pmc.png"
                          alt=""
                        />
                      </div>
                      <div className="right-header">
                        <p>Pharmacity</p>
                      </div>
                    </div>
                    <div className="brand-des">
                      <p>
                        Bên cạnh chuỗi Nhà thuốc tiện lợi, Pharmacity cho ra mắt
                        những sản phẩm mang thương hiệu Pharmacity từ năm 2015
                        với các mặt hàng, hạng mục ngày càng đa dạng. Tính đến
                        nay, Pharmacity đang sở hữu và phân phối hàng trăm mã
                        sản phẩm mang thương hiệu riêng, thuộc các lĩnh vực chăm
                        sóc sức khỏe, chăm sóc cá nhân, chăm sóc sắc đẹp,
                        vitamin và thực phẩm chức năng cùng các sản phẩm tiện
                        lợi.
                      </p>
                    </div>
                  </div>
                  <div className="right-method">
                    <p className="method">Các hình thức giao hàng</p>
                    <p className="free-ship">
                      <img
                        src="https://www.pharmacity.vn/icons/star-green.svg"
                        alt="star-icon"
                      />
                      <span className="free-ship-inner">Freeship&nbsp;</span>
                      cho đơn hàng từ <span>&nbsp;300.000đ</span>
                    </p>
                    <div className="method-ship">
                      <p>Viettel Post</p>
                      <p>GHN</p>
                      <p>Ahamove</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-mid">
          <div className="mid-left">
            <div className="product-tab">
              <div className="product-wrap-tab">
                <div className="tab-inner">
                  <button
                    className={active === 1 ? "tab active" : "tab"}
                    onClick={() => {
                      handleSetActive(1);
                    }}
                  >
                    <span>Mô tả</span>
                  </button>
                  <button
                    className={active === 2 ? "tab active" : "tab"}
                    onClick={() => {
                      handleSetActive(2);
                    }}
                  >
                    <span>Thông tin sản phẩm</span>
                  </button>
                  <button
                    className={active === 3 ? "tab active" : "tab"}
                    onClick={() => {
                      handleSetActive(3);
                    }}
                  >
                    <span>Thương hiệu</span>
                  </button>
                </div>
              </div>
              <div className="tab-content">
                <div className="content">
                  <p>{product?.description}</p>
                </div>
                <div className="more"></div>
              </div>
            </div>
          </div>
          <div className="mid-right"></div>
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
    getAllProduct: (id) => {
      dispatch(actions.getAllProduct(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
