import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { handleCreateUser } from "../../services/userServices";
import { path } from "../../ultils/constants";
import "./Login.scss";
import { Spin } from "antd";
import CommonUtils from "../../ultils/CommonUtils";
function Register(props) {
  // const navigate = useNavigate();
  const [gender, setGender] = useState();
  const [fullName, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateNewUser = async () => {
    if (fullName && password && email && gender && phoneNumber && address) {
      let user = {
        fullName,
        email,
        password,
        gender,
        address,
        phoneNumber,
        roleId: "R2",
      };
      setIsLoading(true);
      let res = await handleCreateUser(user);
      if (res && res.errCode === 0) {
        setIsLoading(false);
        setEmail("");
        setFullname("");
        setGender("");
        setPassword("");
        setPhoneNumber("");
        setAddress("");
        CommonUtils.fireEventToasty(
          `Bạn đã tạo mới tài khoản thành công`,
          "Welcome to website",
          "success",
          "Ok"
        );
        props.history.push("/");
      } else {
        CommonUtils.fireEventToasty(
          `Ohh, Có lỗi rồi`,
          "Bạn hẫy thử lại sau ít phút nhé",
          "error",
          "Ok"
        );
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      CommonUtils.fireEventToasty(
        `Khoan Khoan`,
        "Bạn hãy điền đầy đủ thông tin trước nhé",
        "warning",
        "Ok"
      );
    }
    setIsLoading(false);
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
                <Link className="h4 login" to={path.LOGIN}>
                  Đăng nhập
                </Link>
                <Link
                  className="border-left h4 active register"
                  to={path.REGISTER}
                >
                  Đăng ký
                </Link>
              </div>
              <div className="tab-form">
                <div className="name field">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullname(e.target.value);
                    }}
                    placeholder="Họ tên"
                  />
                </div>
                <div className="email field">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="gender field">
                  <input
                    className="radio1"
                    id="radio1"
                    type="radio"
                    value="F"
                    name="customer[gender]"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    checked={gender === "F"}
                  />
                  <label className="female" htmlFor="radio1">
                    Nữ
                  </label>
                  <input
                    className="radio2"
                    id="radio2"
                    type="radio"
                    value="M"
                    name="customer[gender]"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    checked={gender === "M"}
                  />
                  <label className="male" htmlFor="radio2">
                    Nam
                  </label>
                </div>
                <div className="phone field">
                  <input
                    type="text"
                    placeholder="Phone"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="address field">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="password field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
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
                      Đăng kí
                    </button>
                  </div>
                  <div className="req-pass">
                    Bạn đã có tài khoản?
                    <Link to="/auth/login">Đăng nhập ngay</Link>
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

export default withRouter(Register);
