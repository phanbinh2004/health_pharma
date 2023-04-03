import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    };
    // this.listenToEmitter();
  }
  //   listenToEmitter = () => {
  //     emitter.on("EVENTS_CLEAR_MODAL_DATA", () => {
  //       this.setState({
  //         email: "",
  //         password: "",
  //         firstName: "",
  //         lastName: "",
  //         address: "",
  //       });
  //     });
  //   };
  componentDidMount() {}
  handleValidate = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "phoneNumber",
      "gender",
      "roleId",
      "fullName",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Plz enter " + arrInput[i] + " value");
        break;
      }
    }
    return isValid;
  };
  handleCreateNewUser = () => {
    let isValidUser = this.handleValidate();
    if (isValidUser) {
      this.props.createUser(this.state);
    }
    // let response = await handleCreateUser(data);
    // console.log("response", response);
  };
  handleOnChange = (type, e) => {
    let copyState = { ...this.state };
    copyState[type] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    return (
      <Modal
        centered={true}
        funk={"true"}
        isOpen={this.props.isOpenModal}
        toggle={this.props.toggleFromParent}
      >
        <ModalHeader toggle={this.props.toggleFromParent}>
          Create New User
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="form-row">
              <div className="col-12 my-2 text-center">Create user account</div>
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={(e) => {
                    this.handleOnChange("email", e);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.handleOnChange("password", e);
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="fullName"
                  value={this.state.fullName}
                  onChange={(e) => {
                    this.handleOnChange("fullName", e);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Cell Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="phone"
                  value={this.state.phoneNumber}
                  onChange={(e) => {
                    this.handleOnChange("phoneNumber", e);
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={(e) => {
                    this.handleOnChange("address", e);
                  }}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="inputAddress">Role</label>
                <select
                  type="select"
                  className="form-control"
                  value={this.state.roleId}
                  onChange={(e) => {
                    this.handleOnChange("roleId", e);
                  }}
                >
                  <option>None</option>
                  <option value="R1">Admin</option>
                  <option value="R2">User</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="inputAddress">Gender</label>
                <select
                  type="select"
                  className="form-control"
                  value={this.state.gender}
                  onChange={(e) => {
                    this.handleOnChange("gender", e);
                  }}
                >
                  <option>None</option>
                  <option value="M">Nam</option>
                  <option value="F">Nữ</option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleCreateNewUser();
            }}
          >
            Create
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggleFromParent}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
