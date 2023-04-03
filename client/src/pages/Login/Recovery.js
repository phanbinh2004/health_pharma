import { useState } from "react";
import { Link } from "react-router-dom";
import { handleLoginUser } from "../../services/userServices";
import { path } from "../../ultils/constants";
import "./Login.scss";
function Recovery() {
  const [email, setEmail] = useState();
  const handleCreateNewUser = async () => {};
  return (
    <div className="wrap-login">
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
                <div className="email field">
                  <input
                    type="email"
                    placeholder="Vui lòng nhập email của bạn"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
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
                    <button className="submit" onClick={handleCreateNewUser}>
                      Gửi Email
                    </button>
                  </div>
                  <div className="req-pass">
                    <p>
                      Quay lại
                      <Link to="/auth/login">Đăng nhập</Link>
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

export default Recovery;
