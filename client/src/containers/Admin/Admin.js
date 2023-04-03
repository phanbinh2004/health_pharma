import { Link, useLocation } from "react-router-dom";
import "./Admin.scss";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { path } from "../../ultils/constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function Admin(props) {
  // const location = useLocation();
  const pathName = window.location.pathname;
  const handleLoggout = () => {
    Swal.fire({
      title: "Bạn muốn đăng xuất?",
      text: "Bạn sẽ không thể thực hiện 1 số chức năng",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Huỷ",
      confirmButtonText: "Vâng, đăng xuất",
    }).then((result) => {
      if (result.isConfirmed) {
        props.processLogout();
        Swal.fire("Okeyy!", "Bạn đã bị đăng xuất.", "success");
      }
    });
  };
  return (
    <div className="wrap-admin">
      <div className="admin-header">
        <div className="header">
          <div className="manage">
            <span className="avatar"></span>
            <span className="welcome">Welcome Admin!!!</span>
          </div>

          <div className="action-logout">
            <button className="sign-out" onClick={handleLoggout}>
              Logout
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="nav">
        <div className="nav-bar">
          <h4>Manage System</h4>
          <div className="list-control">
            <ul className="list-manage">
              <Link to={path.MANAGE_USER}>
                <li
                  className={
                    pathName === path.MANAGE_USER
                      ? "item-control active"
                      : "item-control"
                  }
                >
                  Manage-Users
                </li>
              </Link>
              <Link to={path.MANAGE_CART}>
                <li
                  className={
                    pathName === path.MANAGE_CART
                      ? "item-control active"
                      : "item-control"
                  }
                >
                  Manage-Carts
                </li>
              </Link>
              <Link to={path.MANAGE_PRODUCT}>
                <li
                  className={
                    pathName === path.MANAGE_PRODUCT
                      ? "item-control active"
                      : "item-control"
                  }
                >
                  Manage-Products
                </li>
              </Link>
              <Link to={path.MANAGE_ORDER}>
                <li
                  className={
                    pathName === path.MANAGE_ORDER
                      ? "item-control active"
                      : "item-control"
                  }
                >
                  Manage-Orders
                </li>
              </Link>
              <Link to={path.MANAGE_FEEDBACK}>
                <li
                  className={
                    pathName === path.MANAGE_FEEDBACK
                      ? "item-control active"
                      : "item-control"
                  }
                >
                  Manage-Feedbacks
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
