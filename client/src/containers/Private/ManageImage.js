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
function ManageImage() {
  const [allUser, setAllUser] = useState([]);
  const [curentUser, setCurrentUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [image, setImage] = useState(null);

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

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
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
        <div className="wrap-container">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-9"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageImage;
