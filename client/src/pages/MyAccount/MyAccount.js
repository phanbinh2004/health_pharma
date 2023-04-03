import { Link } from "react-router-dom";
import { path } from "../../ultils/constants";
import { connect } from "react-redux";
import "./MyAccount.scss";
import * as actions from "../../store/actions";
function MyAccount(props) {
  const pathName = window.location.pathname;
  // const navigate = useNavigate();
  const { userInfo } = props;
  return (
    <div className="my-account">
      <div className="content">
        <h4 className="text-center py-4 header mb-4">Tài Khoản của bạn</h4>
        <div className="row mt-2">
          <div className="col-2">
            <h3 className="heading">Tài Khoản</h3>
            <div className="list-control">
              <ul className="list-manage">
                <Link
                  to={path.MY_ACCOUNT}
                  className={pathName === path.MY_ACCOUNT ? "active" : ""}
                >
                  <li>Thông tin tài Khoản</li>
                </Link>
                <Link
                  to={path.MY_ADDRESS}
                  className={pathName === path.MY_ADDRESS ? "active" : ""}
                >
                  <li>Danh sách địa chỉ</li>
                </Link>
                <Link
                  to={path.MY_ORDER}
                  className={pathName === path.MY_ORDER ? "active" : ""}
                >
                  <li>Đơn đặt hàng</li>
                </Link>
                <li
                  onClick={() => {
                    props.processLogout();
                    // navigate(path.HOME);
                  }}
                >
                  Đăng xuất
                </li>
              </ul>
            </div>
          </div>
          <div className="col-9 main-info">
            <div className="info-account">
              <h3>Thông tin tài khoản</h3>
              <div className="info">
                <div className="info-address">
                  <h2 className="info-name">
                    Tên: {userInfo && userInfo.fullName}
                  </h2>
                  <h2 className="info-email">
                    Email: {userInfo && userInfo.email}
                  </h2>
                  <div className="info-address">
                    Địa chỉ: {userInfo && userInfo.address}
                    <br />
                    Phone: {userInfo && userInfo.phoneNumber}
                    <br />
                    <Link to={path.MY_ADDRESS}>Xem địa chỉ</Link>
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
    // isLoggedIn: state.auth.isLoggedIn,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
