import "./InfoAccount.scss";
import * as actions from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { path } from "../../ultils/constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function InfoAccount(props) {
  const { userInfo, processLogout } = props;
  const callBackClose = () => {
    props.callBackFunction(!props.isOpen, "info");
  };
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
        processLogout();
        Swal.fire("Okeyy!", "Bạn đã bị đăng xuất.", "success");
      }
    });
  };
  return (
    <div className="account-wrap">
      <div className="account-dropdown">
        <div className="account-content">
          <button className="account-close" onClick={callBackClose}>
            <FontAwesomeIcon icon={faTimes} className="icon" />
          </button>
          <div className="account-main">
            <div className="account-login">
              <div className="login-title">
                <p className="txt-title">Thông tin tài khoản</p>
              </div>
              <div className="login-content">
                <div className="info-user">
                  <div className="account-name">{userInfo.fullName}</div>
                  <ul className="list-info">
                    <li className="item-info">
                      <Link to={path.MY_ACCOUNT} onClick={callBackClose}>
                        Tài khoản của tôi
                      </Link>
                    </li>
                    <li className="item-info">
                      <Link to={path.MY_ADDRESS} onClick={callBackClose}>
                        Danh sách địa chỉ
                      </Link>
                    </li>
                    <li className="item-info">
                      <Link to={path.MY_ORDER} onClick={callBackClose}>
                        Danh sách đơn đặt hàng
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="recaptcha">
                  This site is protected by reCAPTCHA and the Google
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </div>
                <button className="submid-account" onClick={handleLoggout}>
                  Đăng xuất
                </button>
              </div>
              <div className="more-action"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) => {
      dispatch(actions.userLoginSuccess(userInfo));
    },
    processLogout: () => dispatch(actions.processLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoAccount);
