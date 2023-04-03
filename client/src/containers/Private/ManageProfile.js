import {
  faEdit,
  faGear,
  faHome,
  faMessage,
  faPen,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../assets/z4190721558855_934dafb69efa7d17f1ce5fa352a5b4ab.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ModalUser from "../../components/Modal/Modal";
import ModalUserEdit from "../../components/Modal/ModalEdit";
import {
  handleGetAllUser,
  handleCreateUser,
  handleDelete,
  handleEditUser,
} from "../../services/userServices";
import "./Style.scss";
function ManageProfile() {
  const [allUser, setAllUser] = useState([]);
  const [curentUser, setCurrentUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [active, setActive] = useState(1);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await handleGetAllUser("ALL");
        setAllUser(response);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  const handleChangeMenu = (id) => {
    setActive(id);
  };
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenModalEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };
  const handleGetUser = async () => {
    let data = await handleGetAllUser("ALL");
    if (data && data.errCode === 0) {
      setAllUser(data);
    }
  };
  const handleUpdate = async (data) => {
    try {
      let response = await handleEditUser(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        setIsOpenEdit(false);
        await handleGetUser();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteUser = async (id) => {
    let data = await handleGetAllUser(id);
    if (data) {
      if (data.users.roleId === "R1") {
        alert("You don't have permision delete account");
      } else {
        let res = await handleDelete(id);
        if (res.errCode === 0) {
          await handleGetUser("ALL");
        } else {
          alert(res.message);
        }
      }
    }
  };
  const handleCreateNewUser = async (data) => {
    try {
      let response = await handleCreateUser(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        setIsOpen(false);
        await handleGetUser("ALL");
        // emitter.emit("EVENTS_CLEAR_MODAL_DATA");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="wrap-content">
      <div className="wrap-container">
        <header className="profile-header"></header>
        <div className="card card-body mx-md-4 mt-n6 profile-main">
          <div className="row gx-4 mb-2">
            <div className="col-auto">
              <div className="avartar">
                <img src={avatar} alt="avartar" />
              </div>
            </div>
            <div className="col-auto my-auto">
              <div className="h-100">
                <h5 className="mb-1 name">Bình EriDev</h5>
                <p className="mb-0 font-weight-normal text-sm">
                  CEO / PTIT Student
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
              <div className="nav-wrapper position-relative end-0">
                <ul className="nav nav-pills nav-fill p-1">
                  <li className="nav-item" onClick={() => handleChangeMenu(1)}>
                    <div className={active === 1 ? "item active" : "item"}>
                      <FontAwesomeIcon icon={faHome} className="icon" />
                      App
                    </div>
                  </li>
                  <li className="nav-item" onClick={() => handleChangeMenu(2)}>
                    <div className={active === 2 ? "item active" : "item"}>
                      <FontAwesomeIcon icon={faMessage} className="icon" />
                      Message
                    </div>
                  </li>
                  <li className="nav-item" onClick={() => handleChangeMenu(3)}>
                    <div className={active === 3 ? "item active" : "item"}>
                      <FontAwesomeIcon icon={faGear} className="icon" />
                      Setting
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row main-inner">
            <div className="col-12 col-xl-4">
              <div className="card card-plain h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">Mô tả bản thân</h6>
                    </div>
                    <div className="col-md-4 text-end">
                      <FontAwesomeIcon icon={faPen} className="icon" />
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <p className="text-sm">
                    Hi, Mình tên là Bình, hiện tại đang là sinh viên của trường
                    HV Công nghệ Bưu Chính Viễn Thông và đang theo học chuyên
                    ngành công nghệ thông tin. Mình đã tìm hiểu và theo học trên
                    F8 của anh Sơn từ đợt tháng 8 năm 2022 và học thêm 1 số khoá
                    học free trên youtobe. Sau 1 thời gian thì mình đã học xong
                    khoá react của ảnh sơn và tự lên ý tưởng clone lại trang web
                    với cả Backend: Nodejs-Expressjs ,Frontend: Reactjs,
                    Bootstrap, Scss. Với quá trình tự tìm hiểu và tự học theo
                    các video có sẵn mình Tự thành hành với con web này. Và cũng
                    dự định hướng đến đi làm khi con web này mình làm full xong
                    tất cả (If two equally difficult paths, choose the one more
                    painful in the short term).
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="card card-plain h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">Thông tin liên hệ</h6>
                    </div>
                    <div className="col-md-4 text-end">
                      <FontAwesomeIcon icon={faPen} className="icon" />
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="contact">
                    <a href="" target="_blank">
                      <div className="contact-icon">
                        {/* <FontAwesomeIcon icon={faBrands} className="icon fb"/> */}
                        <i className="fa-brands fa-facebook-f"></i>
                      </div>
                    </a>
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

export default ManageProfile;
