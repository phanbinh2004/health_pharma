import { faCartPlus, faEye, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { handleGetCategory } from "../../services/userServices";
import * as actions from "../../store/actions";
import CommonUtils from "../../ultils/CommonUtils";
import { path } from "../../ultils/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./DetailProduct.scss";
function Category(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [numToShow, setNumToShow] = useState(8);
  const [cate, setCate] = useState([]);

  let { products, userInfo } = props;
  const location = useLocation();
  const handleShowMore = () => {
    setShowLoading(true);
    setTimeout(() => {
      if (numToShow > products.length) {
        setNumToShow(products.length);
      } else {
        setNumToShow(numToShow + 4);
      }
      setShowLoading(false);
    }, 1000);
  };
  let pathName = window.location.pathname;
  let param = useParams();
  useEffect(() => {
    props.getAllProduct("ALL");
  }, []);
  useEffect(() => {
    const handleGetCate = async () => {
      let response = await handleGetCategory();
      if (response && response.errCode === 0) {
        setCate(response.categories);
      }
    };
    handleGetCate();
  }, []);
  if (Array.isArray(products) && products.length > 0) {
    if (param.category !== "Sản phẩm giảm giá") {
      products = products.filter((item) => item.categoryId === param.category);
      var countProduct = products.length;
      products = products.slice(0, numToShow);
    } else {
      products = products.filter((item) => Number.parseInt(item.discount) > 0);
      countProduct = products.length;
      products = products.slice(0, numToShow);
    }
  }
  useEffect(() => {
    setNumToShow(8);
  }, [location.pathname]);
  let toVnd = new Intl.NumberFormat();
  const hanldeAddToCart = async (keyProduct) => {
    var product = products.filter((item) => {
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
  return (
    <section className="category-page">
      <div className={showLoading ? "loading" : ""}>
        {showLoading ? <Spin size="large" /> : ""}
      </div>
      <div className="category-wrap">
        <div className="breadcrumb-list">
          <ul className="list-nav">
            <li>
              <Link to={path.HOME}>Trang chủ {"  /"}</Link>
            </li>
            <li>
              <Link to={pathName}>
                {"  "}Danh mục {"  /"}
              </Link>
            </li>
            <li>
              <Link to={pathName}>
                {"  "}
                {param?.category}
              </Link>
            </li>
          </ul>
        </div>
        <div className="container-pd-parent">
          <div className="col-lg-3 col-md-12 col-12 collection-filter ">
            <div className="wrapper_layered_filter">
              <div className="layered_filter_container">
                <div className="main-filter">
                  <div className="filter-group">
                    <div className="filter_group-subtitle">
                      <span>Danh mục sản phẩm</span>
                    </div>
                    <ul className="content-filter">
                      <li className="cate">
                        <Link to={`/category/Sản phẩm giảm giá/9`}>
                          Sản phẩm giảm giá
                        </Link>
                      </li>
                      {cate?.map((item, index) => {
                        return (
                          <li className="cate" key={index}>
                            <Link to={`/category/${item.name}/${item.keyMap}`}>
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="filter-group">
                    <div className="filter_group-subtitle">
                      <span>Nhà cung cấp</span>
                    </div>
                    <ul className="content-filter">
                      <li className="brand">
                        <input type="checkbox" id="brands-1" />
                        <label htmlFor="brands-1">Công ty Dược phẩm TW1</label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-2" />
                        <label htmlFor="brands-2">
                          Công ty Cổ phần Dược liệu TW2
                        </label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-3" />
                        <label htmlFor="brands-3">
                          Công ty Cổ phần Dược liệu TW3
                        </label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-4" />
                        <label htmlFor="brands-4">
                          Công ty Cổ phần Dược liệu Phương Nam
                        </label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-5" />
                        <label htmlFor="brands-5">
                          Công ty Cổ phần thiết bị Y tế Medinsco
                        </label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-6" />
                        <label htmlFor="brands-6">
                          Công ty Cổ phần Dược phẩm Imexpharm
                        </label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-7" />
                        <label htmlFor="brands-7">
                          Công ty Cổ phần Dược phẩm O.P.C
                        </label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-8" />
                        <label htmlFor="brands-8">
                          Công ty Cổ phần Hóa - Dược phẩm Mekophar
                        </label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-9" />
                        <label htmlFor="brands-9">
                          Công ty Cổ phần Dược TW Huế
                        </label>
                      </li>
                      <li className="brand">
                        <input type="checkbox" id="brands-10" />
                        <label htmlFor="brands-10">
                          Công ty Cổ phần Thiết bị Y tế Vimec
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-12 col-12 collection-content">
            <div className="collection-heading__content">
              <div className="dFlex-row">
                <div className="heading-box">
                  <h1 className="heading-title">{param.category}</h1>
                  <div className="total-count">
                    <b>{countProduct} </b> Sản phẩm
                  </div>
                </div>
                <div className="heading-sort">
                  <div className="collection-sort">
                    <div className="sort">
                      <p>
                        <span className="icon">
                          <FontAwesomeIcon icon={faSort} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-tag"></div>
            </div>
            <div className="collection-products row">
              {products?.map((item, index) => {
                let objectPrice = CommonUtils.handleDiscount(
                  item.price,
                  item.discount
                );
                let priceOld = toVnd.format(item.price * 1000);
                let saleBox = objectPrice.discount;
                let priceCurr = toVnd.format(
                  Math.ceil(objectPrice.price) * 1000
                );
                let isDiscount = parseInt(item.discount) !== 0 ? false : true;
                let arrLink = JSON.parse(item.thumbnail);
                return (
                  <div className="product-item" key={index}>
                    <div className="product-loop">
                      <div className="product-inner">
                        <Link
                          to={`/product/${item.keyProduct}/${item.id}`}
                          className="product-image"
                        >
                          <div className="full-img">
                            <div
                              className="first-img"
                              style={{
                                backgroundImage: `url(${arrLink[0]})`,
                              }}
                            >
                              <div className="img-f"></div>
                            </div>
                            <div
                              className="second-img"
                              style={{
                                backgroundImage: arrLink[1]
                                  ? `url(${arrLink[1]})`
                                  : `url(${arrLink[0]})`,
                              }}
                            >
                              <div className="img-l"></div>
                            </div>
                          </div>
                          <span className="eye">
                            <FontAwesomeIcon icon={faEye} className="icon" />
                          </span>
                        </Link>
                        <div className="product-details">
                          <div className="details-top">
                            <div className="vendor">
                              <div>{item.brand}</div>
                            </div>
                          </div>
                          <span className="description">{item.title}</span>
                          <div className="variant"></div>
                          <div className="price">
                            <div className="price-box">
                              {!isDiscount && (
                                <span className="price-curr">{priceCurr}₫</span>
                              )}
                              <br />
                              {
                                <span
                                  className={
                                    isDiscount
                                      ? "price-old decoration"
                                      : "price-old"
                                  }
                                >
                                  {priceOld}₫
                                </span>
                              }
                            </div>
                            {!isDiscount && (
                              <div className="sale-box">-{saleBox}</div>
                            )}
                          </div>
                          <div className="actions">
                            <div className="actions-inner">
                              <button
                                type="submit"
                                className="btn-cart"
                                onClick={() => hanldeAddToCart(item.keyProduct)}
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
            </div>
            <div className="view-more">
              <button onClick={handleShowMore}>Xem thêm sản phẩm</button>
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
    // userLoginSuccess: (userInfo) => {
    //   dispatch(actions.userLoginSuccess(userInfo));
    // },
    getAllProduct: (id) => {
      dispatch(actions.getAllProduct(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
