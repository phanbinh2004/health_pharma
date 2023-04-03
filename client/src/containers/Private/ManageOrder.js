import {
  faArrowUp,
  faBell,
  faBuildingColumns,
  faCartShopping,
  faCheck,
  faClinicMedical,
  faCode,
  faCog,
  faCreditCard,
  faFilePdf,
  faKey,
  faLaptopCode,
  faMoneyBill,
  faMoneyBillAlt,
  faPen,
  faReceipt,
  faSchool,
  faTrash,
  faUser,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import logoAtlassian from "../../assets/dashboard/logo-atlassian.svg";
import logoInvision from "../../assets/dashboard/logo-invision.svg";
import logoJira from "../../assets/dashboard/logo-jira.svg";
import logoSlack from "../../assets/dashboard/logo-slack.svg";
import logoSpotify from "../../assets/dashboard/logo-spotify.svg";
import logoXd from "../../assets/dashboard/logo-xd.svg";
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
function ManageOrder() {
  const [allUser, setAllUser] = useState([]);
  const [curentUser, setCurrentUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
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
      <main className="main-content">
        <div className="row top">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-xl-6 mb-xl-0 mb-4">
                <div className="card-pay">
                  <div className="card-inner">
                    <span className="mask"></span>
                    <div className="card-content">
                      <FontAwesomeIcon icon={faWifi} className="icon" />
                      <h5 className="text-white mt-4 mb-5 pb-2">
                        4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852
                      </h5>
                      <div className="d-flex">
                        <div className="d-flex">
                          <div className="me-4">
                            <p className="text-white text-sm opacity-8 mb-0">
                              Card Holder
                            </p>
                            <h6 className="text-white mb-0">Phan Van Binh</h6>
                          </div>
                          <div className="me-4">
                            <p className="text-white text-sm opacity-8 mb-0">
                              Expires
                            </p>
                            <h6 className="text-white mb-0">11/22</h6>
                          </div>
                        </div>
                        <div className="ms-auto w-20 d-flex align-items-end justify-content-end">
                          <img
                            className="w-60 mt-2"
                            src="https://demos.creative-tim.com/material-dashboard/assets/img/logos/mastercard.png"
                            alt="logo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-md-6 col-6">
                    <div className="card">
                      <div className="card-header mx-4 p-3 text-center content">
                        <div className="header-inner-content">
                          <FontAwesomeIcon icon={faSchool} className="icon" />
                        </div>
                      </div>
                      <div className="card-body pt-0 p-3 text-center body-bottom">
                        <h6 className="text-center mb-0">School</h6>
                        <span className="text-xs">PTIT</span>
                        <hr className="horizontal dark my-3"></hr>
                        <h5>Freshman</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-6">
                    <div className="card">
                      <div className="card-header mx-4 p-3 text-center content">
                        <div className="header-inner-content">
                          <FontAwesomeIcon
                            icon={faLaptopCode}
                            className="icon"
                          />
                        </div>
                      </div>
                      <div className="card-body pt-0 p-3 text-center body-bottom">
                        <h6 className="text-center mb-0">Laptop</h6>
                        <span className="text-xs">MACBOOK</span>
                        <hr className="horizontal dark my-3"></hr>
                        <h5>One Year</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-lg-0 mb-4">
                <div className="card mt-4">
                  <div className="card-header pb-0 p-3 payment-header">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Payment Method</h6>
                      </div>
                      <div className="col-6 text-end">
                        <button className="add-card">+ ADD NEW CARD</button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body payment-body">
                    <div className="row">
                      <div className="col-md-6 mb-md-0 mb-4">
                        <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                          <img
                            src="https://demos.creative-tim.com/material-dashboard/assets/img/logos/mastercard.png"
                            alt="pay"
                          />
                          <h6 className="mb-0">
                            ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
                          </h6>
                          <FontAwesomeIcon icon={faPen} className="icon" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                          <img
                            src="https://demos.creative-tim.com/material-dashboard/assets/img/logos/visa.png"
                            alt="pay"
                          />
                          <h6 className="mb-0">
                            ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;0409
                          </h6>
                          <FontAwesomeIcon icon={faPen} className="icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-header pb-0 p-3 invoice-header">
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <h6 className="mb-0">Invoices</h6>
                  </div>
                  <div className="col-6 text-end">
                    <button className="mb-0">View All</button>
                  </div>
                </div>
              </div>
              <div className="card-body pb-0 invoice-body">
                <ul className="list-group">
                  <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark font-weight-bold text-sm">
                        March, 01, 2020
                      </h6>
                      <span className="text-xs">#MS-415646</span>
                    </div>
                    <div className="d-flex align-items-center text-sm">
                      $180
                      <button className=" pdf btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                        <FontAwesomeIcon icon={faFilePdf} className="icon" />
                        PDF
                      </button>
                    </div>
                  </li>
                  <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark font-weight-bold text-sm">
                        February, 10, 2021
                      </h6>
                      <span className="text-xs">#MS-412326</span>
                    </div>
                    <div className="d-flex align-items-center text-sm">
                      $250
                      <button className=" pdf btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                        <FontAwesomeIcon icon={faFilePdf} className="icon" />
                        PDF
                      </button>
                    </div>
                  </li>
                  <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark font-weight-bold text-sm">
                        July, 05, 2022
                      </h6>
                      <span className="text-xs">#MA-489646</span>
                    </div>
                    <div className="d-flex align-items-center text-sm">
                      $576
                      <button className=" pdf btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                        <FontAwesomeIcon icon={faFilePdf} className="icon" />
                        PDF
                      </button>
                    </div>
                  </li>
                  <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark font-weight-bold text-sm">
                        April, 04, 2023
                      </h6>
                      <span className="text-xs">#AP-418946</span>
                    </div>
                    <div className="d-flex align-items-center text-sm">
                      720
                      <button className=" pdf btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                        <FontAwesomeIcon icon={faFilePdf} className="icon" />
                        PDF
                      </button>
                    </div>
                  </li>
                  <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark font-weight-bold text-sm">
                        March, 01, 2019
                      </h6>
                      <span className="text-xs">#CK-256646</span>
                    </div>
                    <div className="d-flex align-items-center text-sm">
                      $96
                      <button className=" pdf btn btn-link text-dark text-sm mb-0 px-0 ms-4">
                        <FontAwesomeIcon icon={faFilePdf} className="icon" />
                        PDF
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row main">
          <div className="col-md-7 mt-4">
            <div className="card">
              <div className="card-header pb-0 px-3">
                <h6 className="mb-0">Billing Information</h6>
              </div>
              <div className="card-body">
                <ul>
                  <li className="list-group-item border-0 d-flex mb-2 bg-gray-100 border-radius-lg">
                    <div className="d-flex flex-column">
                      <h6 className="mb-3 text-sm">Oliver Liam</h6>
                      <span className="mb-2 text-xs">
                        Company Name:{" "}
                        <span className="text-dark font-weight-bold ms-sm-2">
                          Viking Burrito
                        </span>
                      </span>
                      <span className="mb-2 text-xs">
                        Email Address:{" "}
                        <span className="text-dark ms-sm-2 font-weight-bold">
                          oliver@burrito.com
                        </span>
                      </span>
                      <span className="text-xs">
                        VAT Number:{" "}
                        <span className="text-dark ms-sm-2 font-weight-bold">
                          FRB1235476
                        </span>
                      </span>
                    </div>
                    <div className="ms-auto text-end">
                      <button className="text-danger text-gradient px-3 mb-0">
                        <FontAwesomeIcon icon={faTrash} className="icon" />
                        Delete
                      </button>
                      <button className="text-dark px-3 mb-0">
                        <FontAwesomeIcon icon={faPen} className="icon" />
                        Edit
                      </button>
                    </div>
                  </li>
                  <li className="list-group-item border-0 d-flex mb-2 bg-gray-100 border-radius-lg">
                    <div className="d-flex flex-column">
                      <h6 className="mb-3 text-sm">Hoài Đức</h6>
                      <span className="mb-2 text-xs">
                        Company Name:{" "}
                        <span className="text-dark font-weight-bold ms-sm-2">
                          Viking Burrito
                        </span>
                      </span>
                      <span className="mb-2 text-xs">
                        Email Address:{" "}
                        <span className="text-dark ms-sm-2 font-weight-bold">
                          hoai@gmail.com
                        </span>
                      </span>
                      <span className="text-xs">
                        VAT Number:{" "}
                        <span className="text-dark ms-sm-2 font-weight-bold">
                          FRB127236
                        </span>
                      </span>
                    </div>
                    <div className="ms-auto text-end">
                      <button className="text-danger text-gradient px-3 mb-0">
                        <FontAwesomeIcon icon={faTrash} className="icon" />
                        Delete
                      </button>
                      <button className="text-dark px-3 mb-0">
                        <FontAwesomeIcon icon={faPen} className="icon" />
                        Edit
                      </button>
                    </div>
                  </li>
                  <li className="list-group-item border-0 d-flex mb-2 bg-gray-100 border-radius-lg">
                    <div className="d-flex flex-column">
                      <h6 className="mb-3 text-sm">Mạnh Hùng</h6>
                      <span className="mb-2 text-xs">
                        Company Name:{" "}
                        <span className="text-dark font-weight-bold ms-sm-2">
                          Viking Burrito
                        </span>
                      </span>
                      <span className="mb-2 text-xs">
                        Email Address:{" "}
                        <span className="text-dark ms-sm-2 font-weight-bold">
                          manhhung596@gmail.com
                        </span>
                      </span>
                      <span className="text-xs">
                        VAT Number:{" "}
                        <span className="text-dark ms-sm-2 font-weight-bold">
                          FRA1237547
                        </span>
                      </span>
                    </div>
                    <div className="ms-auto text-end">
                      <button className="text-danger text-gradient px-3 mb-0">
                        <FontAwesomeIcon icon={faTrash} className="icon" />
                        Delete
                      </button>
                      <button className="text-dark px-3 mb-0">
                        <FontAwesomeIcon icon={faPen} className="icon" />
                        Edit
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-5 mt-4"></div>
        </div>
      </main>
    </div>
  );
}

export default ManageOrder;
