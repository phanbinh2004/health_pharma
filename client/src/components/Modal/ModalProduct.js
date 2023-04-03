import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brand: "",
      description: "",
      avatar: "",
      price: "",
      discount: "",
      keyProduct: "",
      category: "",
    };
    // this.listenToEmitter();
  }
  //   listenToEmitter = () => {
  //     emitter.on("EVENTS_CLEAR_MODAL_DATA", () => {
  //       this.setState({
  //         name: "",
  //         brand: "",
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
      "name",
      "brand",
      "description",
      "avatar",
      "price",
      "keyProduct",
      "category",
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
  };
  handlePreviewImage = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    this.setState({
      avatar: file,
    });
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
          Thêm Mới Sản Phẩm
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="form-row">
              <div className="col-12 my-2 text-center">Add new product</div>
              <div className="form-group col-md-6">
                <label htmlFor="inputname4">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={(e) => {
                    this.handleOnChange("name", e);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputbrand4">Thương hiệu</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Brand"
                  value={this.state.brand}
                  onChange={(e) => {
                    this.handleOnChange("brand", e);
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Mô tả</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={this.state.description}
                    onChange={(e) => {
                      this.handleOnChange("description", e);
                    }}
                  ></textarea>
                </div>
              </div>
              <div
                className="form-group col-md-3 mt-2"
                style={{
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <label className="file-input" htmlFor="file">
                  <input
                    type="file"
                    id="file"
                    aria-label="File browser example"
                    hidden
                    multiple
                    onChange={(e) => {
                      this.handlePreviewImage(e);
                    }}
                  />
                  <span className="file-custom">Upload</span>
                </label>
              </div>
              <div className="form-group col-md-3">
                <div
                  className="preview-img"
                  style={{
                    backgroundImage: `url(${this.state.avatar})`,
                  }}
                ></div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="inputAddress">Giá</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  value={this.state.price}
                  onChange={(e) => {
                    this.handleOnChange("price", e);
                  }}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="inputAddress">Giảm giá</label>
                <select
                  type="select"
                  className="form-control"
                  value={this.state.discount}
                  onChange={(e) => {
                    this.handleOnChange("discount", e);
                  }}
                >
                  <option value="0">None</option>
                  <option value="1">5%</option>
                  <option value="2">10%</option>
                  <option value="3">15%</option>
                  <option value="4">15%</option>
                  <option value="5">20%</option>
                  <option value="6">25%</option>
                  <option value="7">30%</option>
                  <option value="8">35%</option>
                  <option value="9">40%</option>
                  <option value="10">45%</option>
                  <option value="11">50%</option>
                  <option value="12">55%</option>
                  <option value="13">60%</option>
                  <option value="14">65%</option>
                  <option value="15">70%</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Mã sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mã sản phẩm"
                  value={this.state.keyProduct}
                  onChange={(e) => {
                    this.handleOnChange("keyProduct", e);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Danh mục</label>
                <select
                  type="select"
                  className="form-control"
                  value={this.state.category}
                  onChange={(e) => {
                    this.handleOnChange("category", e);
                  }}
                >
                  <option value="0">None</option>
                  <option value="1">Giảm đau, Hạ sôt, Kháng viêm</option>
                  <option value="2">Mắt, Tai, Mũi, Họng</option>
                  <option value="3">Cơ xương khớp, Gút</option>
                  <option value="4">Tim mạch, Tiểu đường</option>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
