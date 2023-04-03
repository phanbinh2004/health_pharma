import {
  faArrowUp,
  faBell,
  faCartShopping,
  faCheck,
  faClinicMedical,
  faCode,
  faCog,
  faCreditCard,
  faKey,
  faMoneyBill,
  faMoneyBillAlt,
  faReceipt,
  faUser,
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
import { emitter } from "../../ultils/emitter";
import {
  handleGetAllUser,
  handleCreateUser,
  handleDelete,
  handleEditUser,
  handleGetAllProduct,
} from "../../services/userServices";
import "./Style.scss";
function DashBoard() {
  const [curentUser, setCurrentUser] = useState();
  const [allUser, setAllUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [countUser, setCountUser] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [callApi, setCallApi] = useState();
  const [countCurr, setCountCurr] = useState(0);
  const [countLast, setCountLast] = useState(0);

  useEffect(() => {
    handleCalculatorPercentLastWeek();
    async function fetchData() {
      try {
        const resUser = await handleGetAllUser("ALL");
        const resProduct = await handleGetAllProduct("ALL");
        setCountUser(resUser.users.length);
        setAllUser(resUser.users);
        setTimeout(() => {
          handleCalculatorPercentLastWeek();
        }, 3000);
        setCountProduct(resProduct.products.length);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  const handleCalculatorPercentLastWeek = () => {
    let totalCurr = 0;
    let totalLast = 0;
    const now = new Date();
    let twoWeekAgo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 14
    ).getTime();
    let lastWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    ).getTime();
    let nowDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    if (allUser && allUser.length > 0) {
      // console.log({
      //   totalCurr,
      //   totalLast,
      //   allUser,
      // });
      allUser.forEach((item, index) => {
        let date = new Date(item.createdAt);
        const format =
          date.getFullYear() +
          "," +
          (date.getMonth() + 1) +
          "," +
          date.getDate();
        let ndate = new Date(format).getTime();
        if (ndate >= lastWeek && ndate <= nowDay) {
          totalCurr += 1;
        } else if (ndate >= twoWeekAgo && ndate < lastWeek) {
          totalLast += 1;
        }
      });
    } else {
      // console.log("Chưa call xg api");
    }
    setCountCurr(totalCurr);
    setCountLast(totalLast);
  };
  const handleDeleteUser = async (id) => {
    let data = await handleGetAllUser(id);
    if (data) {
      if (data.users.roleId === "R1") {
        alert("You don't have permision delete account");
      } else {
        let res = await handleDelete(id);
        if (res.errCode === 0) {
          // await handleGetUser("ALL");
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
        // await handleGetUser("ALL");
        // emitter.emit("EVENTS_CLEAR_MODAL_DATA");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="wrap-content">
      <main className="main-content">
        <div className="row view">
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 view-item">
            <div className="card">
              <div className="card-header">
                <div className="header-icon">
                  <FontAwesomeIcon icon={faMoneyBillAlt} className="icon" />
                </div>
                <div className="header-right">
                  <p>Today's Money</p>
                  <h4 className="mb-0">$53k</h4>
                </div>
              </div>
              <span className="my-0 hori"></span>
              <div className="card-footer">
                <p className="mb-0">
                  <span className="">+5% </span>
                  than last week
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 view-item">
            <div className="card">
              <div className="card-header">
                <div className="header-icon user">
                  <FontAwesomeIcon icon={faUser} className="icon" />
                </div>
                <div className="header-right">
                  <p>Total User</p>
                  <h4 className="mb-0">{countUser}</h4>
                </div>
              </div>
              <span className="my-0 hori"></span>
              <div className="card-footer">
                <p className="mb-0">
                  <span className="">
                    {countCurr > countLast
                      ? `+${Math.round((countCurr / countLast) * 100)}%`
                      : `-${1 - Math.round((countCurr / countLast) * 100)}%`}
                  </span>
                  than last week
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 view-item">
            <div className="card">
              <div className="card-header">
                <div className="header-icon receipt">
                  <FontAwesomeIcon icon={faReceipt} className="icon" />
                </div>
                <div className="header-right">
                  <p>Total Order</p>
                  <h4 className="mb-0">{countOrder}</h4>
                </div>
              </div>
              <span className="my-0 hori"></span>
              <div className="card-footer">
                <p className="mb-0">
                  <span className="">+0% </span>
                  than last week
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 view-item">
            <div className="card">
              <div className="card-header">
                <div className="header-icon product">
                  <FontAwesomeIcon icon={faClinicMedical} className="icon" />
                </div>
                <div className="header-right">
                  <p>Total Product</p>
                  <h4 className="mb-0">{countProduct}</h4>
                </div>
              </div>
              <span className="my-0 hori"></span>
              <div className="card-footer">
                <p className="mb-0">
                  <span className="">+1% </span>
                  than last week
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4 bottom">
          <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
            <div className="card">
              <div className="card-header-content pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Projects</h6>
                    <p className="text-sm mb-0">
                      <FontAwesomeIcon icon={faCheck} className="icon" />
                      <span className="font-weight-bold ms-1">
                        30 done
                      </span>{" "}
                      this month
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-content">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Companies
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Members
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Budget
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Completion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img
                                src={logoXd}
                                className="avatar avatar-sm me-3"
                                alt="xd"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">
                                Material XD Version
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group mt-2">
                            <a
                              href=""
                              className="avatar avatar-xs rounded-circle"
                            >
                              {/* <img src="../assets/img/team-1.jpg" alt="team1"/> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                            >
                              {/* <img src="../assets/img/team-2.jpg" alt="team2"/> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                            >
                              {/* <img src="../assets/img/team-3.jpg" alt="team3"> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                            >
                              {/* <img src="../assets/img/team-4.jpg" alt="team4"> */}
                            </a>
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold">
                            {" "}
                            $14,000{" "}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div className="progress-wrapper w-75 mx-auto">
                            <div className="progress-info">
                              <div className="progress-percentage">
                                <span className="text-xs font-weight-bold">
                                  60%
                                </span>
                              </div>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-gradient-info w-60"
                                role="progressbar"
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img
                                src={logoAtlassian}
                                className="avatar avatar-sm me-3"
                                alt="atlassian"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">
                                Add Progress Track
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group mt-2">
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Romina Hadid"
                              data-bs-original-title="Romina Hadid"
                            >
                              {/* <img src="../assets/img/team-2.jpg" alt="team5"> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Jessica Doe"
                              data-bs-original-title="Jessica Doe"
                            >
                              {/* <img src="../assets/img/team-4.jpg" alt="team6"> */}
                            </a>
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold">
                            {" "}
                            $3,000{" "}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div className="progress-wrapper w-75 mx-auto">
                            <div className="progress-info">
                              <div className="progress-percentage">
                                <span className="text-xs font-weight-bold">
                                  10%
                                </span>
                              </div>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-gradient-info w-10"
                                role="progressbar"
                                aria-valuenow="10"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img
                                src={logoSlack}
                                className="avatar avatar-sm me-3"
                                alt="team7"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">
                                Fix Platform Errors
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group mt-2">
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Romina Hadid"
                              data-bs-original-title="Romina Hadid"
                            >
                              {/* <img src="../assets/img/team-3.jpg" alt="team8"> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Jessica Doe"
                              data-bs-original-title="Jessica Doe"
                            >
                              {/* <img src="../assets/img/team-1.jpg" alt="team9"> */}
                            </a>
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold">
                            {" "}
                            Not set{" "}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div className="progress-wrapper w-75 mx-auto">
                            <div className="progress-info">
                              <div className="progress-percentage">
                                <span className="text-xs font-weight-bold">
                                  100%
                                </span>
                              </div>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-gradient-success w-100"
                                role="progressbar"
                                aria-valuenow="100"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img
                                src={logoSpotify}
                                className="avatar avatar-sm me-3"
                                alt="spotify"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">
                                Launch our Mobile App
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group mt-2">
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Ryan Tompson"
                              data-bs-original-title="Ryan Tompson"
                            >
                              {/* <img src="../assets/img/team-4.jpg" alt="user1"> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Romina Hadid"
                              data-bs-original-title="Romina Hadid"
                            >
                              {/* <img src="../assets/img/team-3.jpg" alt="user2"> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Alexander Smith"
                              data-bs-original-title="Alexander Smith"
                            >
                              {/* <img src="../assets/img/team-4.jpg" alt="user3"> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Jessica Doe"
                              data-bs-original-title="Jessica Doe"
                            >
                              {/* <img src="../assets/img/team-1.jpg" alt="user4"> */}
                            </a>
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold">
                            {" "}
                            $20,500{" "}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div className="progress-wrapper w-75 mx-auto">
                            <div className="progress-info">
                              <div className="progress-percentage">
                                <span className="text-xs font-weight-bold">
                                  100%
                                </span>
                              </div>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-gradient-success w-100"
                                role="progressbar"
                                aria-valuenow="100"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img
                                src={logoJira}
                                className="avatar avatar-sm me-3"
                                alt="jira"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">
                                Add the New Pricing Page
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group mt-2">
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Ryan Tompson"
                              data-bs-original-title="Ryan Tompson"
                            >
                              {/* <img src="../assets/img/team-4.jpg" alt="user5"> */}
                            </a>
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold">
                            {" "}
                            $500{" "}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div className="progress-wrapper w-75 mx-auto">
                            <div className="progress-info">
                              <div className="progress-percentage">
                                <span className="text-xs font-weight-bold">
                                  25%
                                </span>
                              </div>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-gradient-info w-25"
                                role="progressbar"
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="25"
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img
                                src={logoInvision}
                                className="avatar avatar-sm me-3"
                                alt="invision"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">
                                Redesign New Online Shop
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group mt-2">
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Ryan Tompson"
                              data-bs-original-title="Ryan Tompson"
                            >
                              {/* <img src="../assets/img/team-1.jpg" alt="user6"> */}
                            </a>
                            <a
                              href="#"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              aria-label="Jessica Doe"
                              data-bs-original-title="Jessica Doe"
                            >
                              {/* <img src="../assets/img/team-4.jpg" alt="user7"> */}
                            </a>
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold">
                            {" "}
                            $2,000{" "}
                          </span>
                        </td>
                        <td className="align-middle">
                          <div className="progress-wrapper w-75 mx-auto">
                            <div className="progress-info">
                              <div className="progress-percentage">
                                <span className="text-xs font-weight-bold">
                                  40%
                                </span>
                              </div>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-gradient-info w-40"
                                role="progressbar"
                                aria-valuenow="40"
                                aria-valuemin="0"
                                aria-valuemax="40"
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100">
              <div className="card-header-content ">
                <h6>Orders overview</h6>
                <p className="text-sm">
                  <FontAwesomeIcon icon={faArrowUp} className="icon up" />
                  <span className="font-weight-bold">24%</span> this month
                </p>
              </div>
              <div className="card-body p-3">
                <div className="body-content">
                  <div className="mb-3 time-content">
                    <span className="time-left">
                      <FontAwesomeIcon icon={faBell} className="icon bell" />
                    </span>
                    <div className="time-right">
                      <h6 className="text-dark mb-0">$2400, Design changes</h6>
                      <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                        22 DEC 7:20 PM
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 time-content">
                    <span className="time-left">
                      <FontAwesomeIcon icon={faCode} className="icon code" />
                    </span>
                    <div className="time-right">
                      <h6 className="text-dark mb-0">New order #4533545</h6>
                      <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                        21 DEC 11PM
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 time-content">
                    <span className="time-left">
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="icon pay"
                      />
                    </span>
                    <div className="time-right">
                      <h6 className="text-dark mb-0">
                        Server payments for April
                      </h6>
                      <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                        21 DEC 9:34 PM
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 time-content">
                    <span className="time-left">
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className="icon order"
                      />
                    </span>
                    <div className="time-right">
                      <h6 className="text-dark mb-0">
                        New card added for order #4395133
                      </h6>
                      <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                        20 DEC 2:20 PM
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 time-content">
                    <span className="time-left">
                      <FontAwesomeIcon icon={faKey} className="icon key" />
                    </span>
                    <div className="time-right">
                      <h6 className="text-dark mb-0">
                        Unlock packages for development
                      </h6>
                      <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                        18 DEC 4:54 PM
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 time-content">
                    <span className="time-left">
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="icon new-order"
                      />
                    </span>
                    <div className="time-right">
                      <h6 className="text-dark mb-0">New order #9583120</h6>
                      <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                        17 DEC
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashBoard;
