import {
  faArrowRightFromBracket,
  faCartPlus,
  faChartLine,
  faCog,
  faHouseMedical,
  faImages,
  faMessage,
  faReceipt,
  faTableList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { path } from "../../../ultils/constants";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import "./scss/Main.scss";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLoggout = () => {
    this.props.processLogout();
    this.props.history.push(path.HOME);
  };
  render() {
    return (
      <React.Fragment>
        <aside className="nav-aside">
          <div className="nav-header">
            <div className="header-inner">Welcome Admin!!!</div>
          </div>
          <span className="hori"></span>
          <div className="list-manage">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={path.MANAGE_DASHBOARD}>
                  <div className="icon-left">
                    <FontAwesomeIcon icon={faChartLine} className="icon" />
                  </div>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={path.MANAGE_USER}>
                  <div className="icon-left">
                    <FontAwesomeIcon icon={faTableList} className="icon" />
                  </div>
                  <span>Bảng Người Dùng</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={path.MANAGE_ORDER}>
                  <div className="icon-left">
                    <FontAwesomeIcon icon={faReceipt} className="icon" />
                  </div>
                  <span>Đơn Hàng</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={path.MANAGE_PRODUCT}>
                  <div className="icon-left">
                    <FontAwesomeIcon icon={faHouseMedical} className="icon" />
                  </div>
                  <span>Sản Phẩm</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={path.MANAGE_IMAGE}>
                  <div className="icon-left">
                    <FontAwesomeIcon icon={faImages} className="icon" />
                  </div>
                  <span>Hình ảnh</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={path.MANAGE_CART}>
                  <div className="icon-left">
                    <FontAwesomeIcon icon={faCartPlus} className="icon" />
                  </div>
                  <span>Giỏ Hàng</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={path.MANAGE_FEEDBACK}>
                  <div className="icon-left">
                    <FontAwesomeIcon icon={faMessage} className="icon" />
                  </div>
                  <span>Phản Hồi</span>
                </NavLink>
              </li>
              <li className="nav-item mt-3">
                <h6 className="control-account">Account pages</h6>
              </li>
              <li className="nav-item">
                <NavLink to={path.ADMIN_PROFILE}>
                  <div className="icon-left">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                  </div>
                  <span>Profile</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  to={path.HOME}
                  className="logout"
                  onClick={this.handleLoggout}
                >
                  <div className="icon-left">
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="icon"
                    />
                  </div>
                  <span>Đăng Xuất</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
        <header
          style={{
            backgroundColor: "#f2f3f5",
            position: "fixed",
            width: "100%",
            zIndex: "999",
          }}
        >
          <nav className="header-nav">
            <div className="nav-main">
              <div>
                <ul className="breadcrum">
                  <li>Pages</li>
                  <li className="active">DashBoard</li>
                </ul>
                <h6>DashBoard</h6>
              </div>
              <div className="navbar-right">
                <ul>
                  <li className="item-nav">
                    <button>Profile</button>
                  </li>
                  <li className="item-nav">
                    <div>
                      <FontAwesomeIcon icon={faUser} className="icon" />
                      <span>Admin</span>
                    </div>
                  </li>
                  <li className="item-nav setting">
                    <FontAwesomeIcon icon={faCog} className="icon" />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </React.Fragment>
    );
  }
}
// export default Main;
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // userLoginSuccess: (userInfo) => {
    //   dispatch(actions.userLoginSuccess(userInfo));
    // },
    processLogout: () => dispatch(actions.processLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
