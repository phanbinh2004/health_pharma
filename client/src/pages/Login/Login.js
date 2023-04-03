import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { handleLoginUser } from "../../services/userServices";
import { path } from "../../ultils/constants";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Spin } from "antd";
import "./Login.scss";
import CommonUtils from "../../ultils/CommonUtils";
function Login(props) {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
          props.history.push(path.MANAGE_DASHBOARD);
          CommonUtils.fireEventToasty(
            `Heyy Admin ${data.user.fullName}!`,
            "Chào mừng bạn đã quay trở lại",
            "success",
            "Ok"
          );
        } else {
          props.history.push(path.HOME);
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
    <div className="wrap-login">
      <div className={isLoading ? "loading" : ""}>
        {isLoading ? <Spin size="large" /> : ""}
      </div>
      <div className="layout-account">
        <div className="account-main">
          <div className="account-inner">
            <div className="account-form">
              <div className="tab-header">
                <Link to={path.LOGIN} className="h4 active login">
                  Đăng nhập
                </Link>
                <Link
                  className="border-left h4 register"
                  to={path.REGISTER}
                  style={{
                    "&:hover": {
                      background: "red",
                    },
                  }}
                >
                  Đăng ký
                </Link>
              </div>
              <div className="tab-form">
                <div className={errMessage ? "wrong field" : "field"}>
                  <input
                    type="email"
                    placeholder="Vui lòng nhập email của bạn"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className={errMessage ? "wrong field" : "field"}>
                  <input
                    type="password"
                    placeholder="Vui lòng nhập mật khẩu"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    color: "red",
                  }}
                >
                  {errMessage}
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
                <div className="action">
                  <div>
                    <button className="submit" onClick={handleLogin}>
                      Đăng nhập
                    </button>
                  </div>
                  <div className="req-pass">
                    <p>
                      Bạn chưa có tài khoản?
                      <Link to={path.REGISTER}>Đăng ký</Link>
                    </p>
                    <p>
                      Bạn quên mật khẩu?
                      <Link to={path.RECOVERY}>Quên mật khẩu</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
