import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {
  faBars,
  faCartPlus,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { path } from "../../ultils/constants";
import { SvgSearch } from "../../components/Svg";
import "./Header.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Locate from "../Locate/Locate";
import Account from "../Account/Account";
import Cart from "../Cart/Cart";
import InfoAccount from "../InfoAccount/InfoAccount";
const Header = (props) => {
  let location = useLocation();
  const [isOpenLocate, setIsOpenLocate] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { isLoggedIn, userInfo } = props;
  const callBackFunction = (isOpenFromChild, type) => {
    if (type === "locate") {
      setIsOpenLocate(isOpenFromChild);
    } else if (type === "account") {
      setIsOpenAccount(isOpenFromChild);
    } else if (type === "cart") {
      setIsOpenCart(isOpenFromChild);
    } else if (type === "info") {
      setIsOpenInfo(isOpenFromChild);
    }
  };
  const pathUrl = window.location.pathname;
  useEffect(() => {
    if (location.pathname === path.HOME) {
      setIsShowMenu(true);
    } else {
      setIsShowMenu(false);
    }
  }, [location.pathname]);
  return (
    <header className="header">
      <div className="header-top-wrap">
        <div className="header-top">
          <div className="box-content-top">
            <div className="box-left">
              <div className="hotline">
                <span>
                  Hotline: <b>0865.294.312</b> (8h - 12h, 13h30 - 17h)
                </span>
              </div>
              <div className="contact">
                <a href="/">Liên hệ hợp tác</a>
              </div>
            </div>
            <div className="box-right"></div>
          </div>
        </div>
      </div>
      <div className="header-mid-wrap">
        <div className="header-mid">
          <div className="box-content-mid">
            <div className="box-lopo">
              <Link to={path.HOME} className="wrap-logo">
                <img
                  itemProp="logo"
                  src="//theme.hstatic.net/200000599309/1000947063/14/logo.png?v=666"
                  alt="Health Pharma"
                  className="image-logo"
                />
              </Link>
            </div>
            <div className="box-search">
              <div className="header-search">
                <div className="header-search-wrap">
                  <input
                    type="search"
                    className="input-search"
                    placeholder="Tìm kiếm sản phẩm..."
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <button type="button" className="btn-search">
                    <SvgSearch />
                  </button>
                </div>
              </div>
            </div>
            <div className="box-action">
              <div className="header-action">
                <div className="action-locate">
                  <div className="action-locate-top">
                    <button
                      className="btn-locate"
                      onClick={() => {
                        setIsOpenLocate(!isOpenLocate);
                        setIsOpenAccount(false);
                        setIsOpenCart(false);
                        setIsOpenInfo(false);
                      }}
                    >
                      <span className="locate-content">
                        <span className="locate-content-top">
                          Giao hoặc đến lấy tại{" "}
                          <FontAwesomeIcon icon={faSortDown} />
                        </span>
                        <span className="locate-content-bot">
                          <span className="txt-overflow">
                            182 Lê Đại Hành, , Quận 11
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                  {isOpenLocate && (
                    <Locate
                      callBackFunction={callBackFunction}
                      isOpen={isOpenLocate}
                    />
                  )}
                </div>
                <div className="action-account">
                  <div className="action-account-top">
                    <button
                      className="btn-account"
                      onClick={() => {
                        if (!isLoggedIn) {
                          setIsOpenAccount(!isOpenAccount);
                        } else {
                          setIsOpenInfo(!isOpenInfo);
                        }
                        setIsOpenLocate(false);
                        setIsOpenCart(false);
                      }}
                      // disabled={pathUrl.startsWith("/auth") ? true : false}
                    >
                      <div className="user-icon">
                        <FontAwesomeIcon className="icon" icon={faUser} />
                      </div>
                      <div className="account-content">
                        <span className="account-content-top">
                          Đăng nhập/ Đăng ký
                        </span>
                        <br />
                        <span className="account-content-bot">
                          {isLoggedIn
                            ? `${userInfo?.fullName}`
                            : "Tài khoản của tôi"}
                        </span>
                      </div>
                    </button>
                  </div>
                  {!isLoggedIn && isOpenAccount && (
                    <Account
                      callBackFunction={callBackFunction}
                      isOpen={isOpenAccount}
                    />
                  )}
                  {isLoggedIn && isOpenInfo && (
                    <InfoAccount
                      callBackFunction={callBackFunction}
                      isOpen={isOpenInfo}
                    />
                  )}
                </div>
                <div className="action-cart">
                  <div className="action-cart-top">
                    <button
                      className="btn-cart"
                      onClick={() => {
                        setIsOpenCart(!isOpenCart);
                        setIsOpenAccount(false);
                        setIsOpenLocate(false);
                        setIsOpenInfo(false);
                      }}
                    >
                      <div className="cart-icon">
                        <FontAwesomeIcon className="icon" icon={faCartPlus} />
                        <span className="cart-count">0</span>
                      </div>
                      <div className="cart-content">
                        <span className="cart-content">Giỏ hàng</span>
                      </div>
                    </button>
                  </div>
                  {isOpenCart && (
                    <Cart
                      callBackFunction={callBackFunction}
                      isOpen={isOpenCart}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom-wrap">
        <div className="header-bottom">
          <div className="header-bottom-left">
            <div className="site-bar-content">
              <div
                className="title-menu"
                onClick={() => {
                  if (pathUrl !== path.HOME) {
                    setIsShowMenu(!isShowMenu);
                  }
                }}
              >
                <FontAwesomeIcon icon={faBars} className="icon" />
                <span style={{ userSelect: "none" }}>Danh mục sản phẩm</span>
              </div>
              {isShowMenu && (
                <div className="site-bar-main">
                  <div className="main-menu">
                    <ul className="link-list">
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Health Pharma
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Dược phẩm
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Chăm sóc sức khoẻ
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Tiêu hoá, gan mật
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Thực phẩm chức năng{" "}
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Chăm sóc cá nhân
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Sản phẩm tiện lợi
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Chăm sóc sắc đẹp
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Mẹ và bé
                        </Link>
                      </li>
                      <li className="link-item">
                        <Link to="" className="link-item-to">
                          Thiết bị y tế
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="header-bottom-right">
            <div className="box-policy">
              <ul className="list-policy">
                <li className="box-item">
                  <div className="box-icon">
                    <img
                      src="//theme.hstatic.net/200000599309/1000947063/14/header_03_policy_1_ico.png?v=666"
                      alt="Đảm bảo chất lượng"
                    />
                  </div>
                  <div className="box-text">Đảm bảo chất lượng</div>
                </li>
                <li className="box-item">
                  <div className="box-icon">
                    <img
                      src="//theme.hstatic.net/200000599309/1000947063/14/header_03_policy_2_ico.png?v=666"
                      alt="Miễn phí vận chuyển"
                    />
                  </div>
                  <div className="box-text">Miễn phí vận chuyển</div>
                </li>
                <li className="box-item">
                  <div className="box-icon">
                    <img
                      src="//theme.hstatic.net/200000599309/1000947063/14/header_03_policy_3_ico.png?v=666"
                      alt="Mở hộp kiểm tra nhận hàng"
                    />
                  </div>
                  <div className="box-text">Mở hộp kiểm tra nhận hàng</div>
                </li>
              </ul>
            </div>
            <div className="box-live">
              <button type="button" className="btn-live">
                Live stream
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
