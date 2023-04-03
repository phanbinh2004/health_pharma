import { Link } from "react-router-dom";
import { path } from "../../ultils/constants";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./MyAccount.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleEditUser } from "../../services/userServices";
import {
  faEdit,
  faMapMarker,
  faMobileAlt,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
function MyAddress(props) {
  const pathName = window.location.pathname;
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const { userInfo } = props;
  const handleEditAddress = () => {
    setShowEdit(!showEdit);
  };
  const handleDeleteAddress = () => {
    // eslint-disable-next-line no-restricted-globals
    let isDelete = confirm("Xác nhận xoá");
    if (isDelete) {
      alert("Chức năng xoá địa chỉ đang được bảo trì");
    }
  };
  const handleAddAddress = () => {
    setShowAdd(!showAdd);
  };
  const handleUpdateInfo = async () => {
    try {
      if (userInfo) {
        let response = await handleEditUser({
          fullName: `${firstName} ${lastName}`,
          address,
          phoneNumber,
          id: userInfo.id,
        });
        if (response && response.errCode !== 0) {
          alert("falied", response.errMessage);
        } else {
          alert("success!!!", response.errMessage);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddNewAddress = async () => {
    alert("Chức năng thêm mới địa chi đang được bảo trì");
  };
  useEffect(() => {
    if (userInfo) {
      const fName = userInfo.fullName.split(" ").slice(0, -1).join(" ");
      const lName = userInfo.fullName.split(" ").slice(-1).join(" ");
      setFirstName(fName);
      setLastName(lName);
      setAddress(userInfo.address);
      setPhoneNumber(userInfo.phoneNumber);
    }
  }, []);
  return (
    <div className="my-account">
      <div className="content">
        <h4 className="text-center py-4 header mb-4">Danh sách địa chỉ </h4>
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
                <li onClick={props.processLogout}>Đăng xuất</li>
              </ul>
            </div>
          </div>
          <div className="col-9 main-info">
            <div className="row wrap-address">
              <div className="col-lg-6 col-md-12 col-12 edit-address">
                <div className="table-address">
                  <div className="row">
                    <div className="col-lg-12 col-xs-12 title-header">
                      <div className="address-header">
                        <h3>
                          <strong>{userInfo && userInfo.fullName}</strong>
                          <span className="default_address note">
                            (Địa chỉ mặc định)
                          </span>
                        </h3>
                        <p className="action-right">
                          <span className="action_link action_edit">
                            <button onClick={handleEditAddress}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </span>
                          <span className="action_link action_delete">
                            <button onClick={handleDeleteAddress}>
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </span>
                        </p>
                      </div>
                      <div className="info-address">
                        {!showEdit && (
                          <div className="view-address">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 large_view">
                                <p>
                                  <strong>
                                    {userInfo && userInfo.fullName}
                                  </strong>
                                </p>
                              </div>
                              <div className="col-lg-12 col-md-12 large_view">
                                <div className="lb-left">
                                  <b>Địa chỉ:</b>
                                </div>
                                <div className="lb-right">
                                  <p>{userInfo && userInfo.address}</p>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12 large_view">
                                <div className="lb-left">
                                  <b>Số điện thoại:</b>
                                </div>
                                <div className="lb-right">
                                  {userInfo && userInfo.phoneNumber}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {showEdit && (
                          <div className="edit-info-address">
                            <div className="input-group">
                              <span className="input-ico">
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="icon"
                                />
                              </span>
                              <input
                                type="text"
                                className="input-textbox textbox"
                                size="40"
                                value={firstName}
                                onChange={(e) => {
                                  setFirstName(e.target.value);
                                }}
                                placeholder="Họ"
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-ico">
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="icon"
                                />
                              </span>
                              <input
                                type="text"
                                className="input-textbox textbox"
                                size="40"
                                value={lastName}
                                onChange={(e) => {
                                  setLastName(e.target.value);
                                }}
                                placeholder="Tên"
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-ico">
                                <FontAwesomeIcon
                                  icon={faMapMarker}
                                  className="icon"
                                />
                              </span>
                              <input
                                type="text"
                                className="input-textbox textbox"
                                size="40"
                                value={address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                                placeholder="Địa chỉ"
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-ico">
                                <FontAwesomeIcon
                                  icon={faMobileAlt}
                                  className="icon"
                                />
                              </span>
                              <input
                                type="text"
                                className="input-textbox textbox"
                                size="40"
                                value={phoneNumber}
                                onChange={(e) => {
                                  setPhoneNumber(e.target.value);
                                }}
                                placeholder="Số điện thoại"
                              />
                            </div>
                            <div className="action-bottom">
                              <button onClick={handleUpdateInfo}>
                                Cập nhập
                              </button>
                              <span>
                                Hoặc{" "}
                                <span
                                  className="close-edit"
                                  onClick={handleEditAddress}
                                >
                                  Huỷ
                                </span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12 add-address">
                <div className="add-header" onClick={handleAddAddress}>
                  Nhập địa chỉ mới
                </div>
                {showAdd && (
                  <div className="add-inner">
                    <div className="edit-info-address">
                      <div className="input-group">
                        <span className="input-ico">
                          <FontAwesomeIcon icon={faUser} className="icon" />
                        </span>
                        <input
                          type="text"
                          className="input-textbox textbox"
                          size="40"
                          value={firstName}
                          disabled
                          placeholder="Họ"
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-ico">
                          <FontAwesomeIcon icon={faUser} className="icon" />
                        </span>
                        <input
                          type="text"
                          className="input-textbox textbox"
                          size="40"
                          value={lastName}
                          disabled
                          placeholder="Tên"
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-ico">
                          <FontAwesomeIcon
                            icon={faMapMarker}
                            className="icon"
                          />
                        </span>
                        <input
                          type="text"
                          className="input-textbox textbox"
                          size="40"
                          value={newAddress}
                          onChange={(e) => {
                            setNewAddress(e.target.value);
                          }}
                          placeholder="Địa chỉ"
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-ico">
                          <FontAwesomeIcon
                            icon={faMobileAlt}
                            className="icon"
                          />
                        </span>
                        <input
                          type="text"
                          className="input-textbox textbox"
                          size="40"
                          value={newPhone}
                          onChange={(e) => {
                            setNewPhone(e.target.value);
                          }}
                          placeholder="Số điện thoại"
                        />
                      </div>
                      <div className="action-bottom">
                        <button onClick={handleAddNewAddress}>Thêm mới</button>
                        <span>
                          Hoặc{" "}
                          <span
                            className="close-edit"
                            onClick={handleAddAddress}
                          >
                            Huỷ
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);
