import {
  faEdit,
  faPen,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { emitter } from "../../ultils/emitter";
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
function ManageUser() {
  const [allUser, setAllUser] = useState([]);
  const [curentUser, setCurrentUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
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
        emitter.emit("EVENTS_CREATE_USER");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="wrap-content">
      <div className="content">
        <ModalUser
          isOpenModal={isOpen}
          toggleFromParent={handleOpenModal}
          createUser={handleCreateNewUser}
        />
        {isOpenEdit && (
          <ModalUserEdit
            isOpenModal={isOpenEdit}
            toggleFromParent={handleOpenModalEdit}
            user={curentUser}
            updateUser={handleUpdate}
          />
        )}
        <div className="wrap-container">
          <div className="row">
            <div className="col-12">
              <div className="card-table my-4">
                <div className="table-header">
                  <div className="header-inner">
                    <h6 className="text-white text-capitalize ps-3">
                      Authors table
                    </h6>
                    <button
                      className="btn"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      Add New Author
                    </button>
                  </div>
                </div>
                <div className="table-body">
                  <div className="table-res">
                    <table>
                      <thead>
                        <tr>
                          <th scope="col" className="">
                            Authors
                          </th>
                          <th scope="col" className="">
                            Function
                          </th>
                          <th scope="col" className="text-center">
                            Phone
                          </th>
                          <th scope="col" className="text-center">
                            Employed
                          </th>
                          <th scope="col" className="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUser.users?.map((user, index) => {
                          const date = new Date(user.createdAt);
                          const format =
                            date.getFullYear() +
                            "/" +
                            (date.getMonth() + 1) +
                            "/" +
                            date.getDate();
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex px-2 py-1 td1">
                                  <div
                                    className="icon-user"
                                    style={{
                                      color:
                                        user.roleId === "R1"
                                          ? "#ec407a"
                                          : "#242025",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faUser}
                                      className="icon"
                                    />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center info">
                                    <h6 className="mb-0 text-sm">
                                      {user.fullName}
                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      {user.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {user.roleId === "R1"
                                    ? "Quản Trị Viên"
                                    : "Người Dùng"}
                                </p>
                                <p className="text-xs text-secondary mb-0">
                                  {user.roleId === "R1" &&
                                  user.phoneNumber === 865294312
                                    ? "Developer"
                                    : "User"}
                                </p>
                              </td>
                              <td className="text-center">
                                {user.phoneNumber}
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {format}
                                </span>
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn-edit btn"
                                  onClick={() => {
                                    setIsOpenEdit(true);
                                    setCurrentUser(user);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    className="icon"
                                  />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn-delete btn"
                                  onClick={() => {
                                    handleDeleteUser(user.id);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className="icon"
                                  />
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

export default ManageUser;
