import "./Account.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import { handleLoginUser } from "../../services/userServices";
import { useState } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { path } from "../../ultils/constants";
import { Spin } from "antd";
import CommonUtils from "../../ultils/CommonUtils";
function Account(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { history } = props;
  const handleLogin = async () => {
    setErrMessage("");
    try {
      setIsLoading(true);
      let data = await handleLoginUser(email, password);
      if (data && data.errCode !== 0) {
        setErrMessage(data.errMessage);
        setIsLoading(false);
      }
      if (data && data.errCode === 0) {
        setIsLoading(false);
        props.userLoginSuccess(data.user);
        if (data.user.roleId === "R1") {
          history.push(path.MANAGE_DASHBOARD);
          CommonUtils.fireEventToasty(
            `Heyy Admin ${data.user.fullName}!`,
            "Chào mừng bạn đã quay trở lại",
            "success",
            "Ok"
          );
        } else {
          history.push(path.HOME);
          CommonUtils.fireEventToasty(
            `Heyy ${data.user.fullName}!`,
            "Chào mừng bạn đã quay trở lại",
            "success",
            "Ok"
          );
        }
        setEmail("");
        setPassword("");
        props.callBackFunction(!props.isOpen, "account");
      }
    } catch (e) {
      if (e?.response?.data) {
        setErrMessage(e.response.data.message);
      }
    }
  };
  return (
    <div className="account-wrap">
      <div className={isLoading ? "loading" : ""}>
        {isLoading ? <Spin size="large" /> : ""}
      </div>
      <div className="account-dropdown">
        <div className="account-content">
          <button
            className="account-close"
            onClick={() => {
              props.callBackFunction(!props.isOpen, "account");
            }}
          >
            <FontAwesomeIcon icon={faTimes} className="icon" />
          </button>
          <div className="account-main">
            <div className="account-login">
              <div className="login-title">
                <p className="txt-title">Đăng nhập tài khoản</p>
                <p className="txt-subtitle">Nhập email và mật khẩu của bạn:</p>
              </div>
              <div className="login-content">
                <div className={errMessage ? "form-input wrong" : "form-input"}>
                  <input
                    type="email"
                    className="input-email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={errMessage ? "form-input wrong" : "form-input"}>
                  <input
                    type="password"
                    className="input-email"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <span style={{ color: "red" }}>{errMessage}</span>
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
                <button className="submid-account" onClick={handleLogin}>
                  Đăng nhập
                </button>
              </div>
              <div className="more-action">
                <span className="action-first">
                  Khách hành mới?
                  <Link
                    to={path.REGISTER}
                    className="new-account"
                    onClick={() => {
                      props.callBackFunction(!props.isOpen, "account");
                    }}
                  >
                    Tạo tài khoản
                  </Link>
                </span>
                <br />
                <span className="action-second">
                  Quên mật khẩu?
                  <Link
                    to={path.RECOVERY}
                    className="new-account"
                    onClick={() => {
                      props.callBackFunction(!props.isOpen, "account");
                    }}
                  >
                    Khôi phục mật khẩu
                  </Link>
                </span>
              </div>
            </div>
            <div className="account-recovery"></div>
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
    userLoginSuccess: (userInfo) => {
      dispatch(actions.userLoginSuccess(userInfo));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Account));
