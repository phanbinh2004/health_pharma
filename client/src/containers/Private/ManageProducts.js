import { useEffect, useRef, useState } from "react";
import ModalUser from "../../components/Modal/Modal";
import ModalProduct from "../../components/Modal/ModalProduct";
import ModalUserEdit from "../../components/Modal/ModalEdit";
import CommonUtils from "../../ultils/CommonUtils";
import {
  handleGetAllUser,
  handleCreateUser,
  handleDeleteProduct,
  handleEditUser,
  handleAddProduct,
  handleGetAllProduct,
} from "../../services/userServices";
import "./Style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPaperclip,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
function ManageProduct() {
  let upload = useRef(null);
  const [allProduct, setAllProduct] = useState([]);
  const [curent, setCurrent] = useState();
  const [curent2, setCurrent2] = useState();
  const [inputSearch, setInputSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [avatar, setAvatar] = useState([]);
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [thumbnail, setThumbnail] = useState([]);
  const [keyProduct, setKeyProduct] = useState();
  const [category, setCategory] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState();
  const [options, setOptions] = useState({
    price: "",
    category: "",
    name: "",
    distributor: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await handleGetAllProduct("ALL");
        setAllProduct(response.products);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [curent]);
  const handleDeleteProductWithId = async (id) => {
    let response = await handleDeleteProduct(id);
    if (response && response.errCode === 0) {
      setCurrent(Math.random());
    }
    alert(response.errMessage);
  };
  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("keyProduct", keyProduct);
      for (let i = 0; i < thumbnail.length; ++i) {
        formData.append("thumbnail", thumbnail[i]);
      }
      let response = await handleAddProduct(formData);
      if (response.errCode === 0) {
        alert(response.errMessage);
        setName("");
        setBrand("");
        setPrice("");
        setDiscount(0);
        setAvatar("");
        setThumbnail("");
        setCategory(0);
        setDescription("");
        setKeyProduct("");
        setCurrent(keyProduct);
        setIsSuccess(true);
      } else {
        alert(response.errMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleProduct = () => {
    setIsOpen(!isOpen);
  };
  let sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const handleAnimationFile = async (e) => {
    let listURL = Object.values(e.target.files);
    if (listURL.length > 0) {
      listURL.forEach(async (item) => {
        setThumbnail((prev) => [...prev, item]);
        let listAvatar = URL.createObjectURL(item);
        setAvatar((prev) => [...prev, listAvatar]);
      });
    }
    if (thumbnail && avatar) {
      upload = upload.current;
      upload.classList.add("uploading");
      await sleep(3000);
      upload.classList.add("uploaded");
      await sleep(2000);
      upload.classList.remove("uploading");
      upload.classList.add("uploaded-after");
      await sleep(1000);
      upload.className = "upload-file";
    }
  };
  const handleAnimationBtn = async (e) => {
    let domElement = e.target;
    domElement.classList.add("btn-progress");
    await sleep(500);
    domElement.classList.add("btn-fill");
    await sleep(4100);
    domElement.classList.remove("btn-fill");
    domElement.classList.add("btn-complete");
    domElement.classList.remove("btn-progress");
    await sleep(600);
    domElement.classList.remove("btn-complete");
  };
  const handleDeleteAvatar = (index) => {
    let valueRemove = avatar[index];
    const newArr = avatar.filter((item) => item !== valueRemove);
    setAvatar(newArr);
    let thumbnailRemove = thumbnail[index];
    const newArr2 = thumbnail.filter((item) => item !== thumbnailRemove);
    setThumbnail(newArr2);
  };

  const filterProducts = (products, options) => {
    if (products) {
      if (options) {
        if (options.price && options.price !== "0") {
          if (options.price === "price-asc") {
            products.sort((a, b) => {
              return a.price - b.price;
            });
          } else if (options.price === "price-desc") {
            products.sort((a, b) => {
              return b.price - a.price;
            });
          }
        }
        if (options.name && options.name !== "0") {
          if (options.name === "name-asc") {
            products.sort((a, b) => a.title.localeCompare(b.title));
          } else if (options.name === "name-desc") {
            products.sort((a, b) => b.title.localeCompare(a.title));
          }
        }

        if (options.category && options.category !== "0") {
          products = products.filter(
            (product) => product.categoryId === options.category
          );
        }

        if (options.distributor && options.distributor !== "0") {
          products = products.filter(
            (product) => product.brand === options.distributor
          );
        }
      }
      return products;
    }
  };
  const handleKeyUp = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (!inputSearch) {
      alert("Bạn phải nhập từ khoá dể tìm kiếm");
    } else {
      const searchProducts = filteredProducts?.filter((product) => {
        return product.title.toLowerCase().includes(inputSearch.toLowerCase());
      });
      setFilteredProducts(searchProducts);
    }
  };
  useEffect(() => {
    const filtered = filterProducts(allProduct, options);
    setFilteredProducts(filtered);
  }, [options, allProduct, curent2]);
  const handleOptionChange = (option, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: value,
    }));
  };
  const handleChangeInputSearch = (e) => {
    setInputSearch(e.target.value);
    if (!e.target.value) {
      setFilteredProducts(allProduct);
      setCurrent2(Math.floor(Math.random() * 10000));
    }
  };
  return (
    <div className="wrap-content">
      <div className="content">
        <div className="wrap-container">
          <div className="row">
            <div className="col-12">
              <div className="card-table my-4">
                <div className="table-header">
                  <div
                    className="header-inner"
                    style={{
                      justifyContent: isOpen ? "flex-end" : "space-between",
                    }}
                  >
                    {!isOpen && (
                      <div className="filter">
                        <h6 className="text-white text-capitalize ps-3">
                          Lọc/Sắp xếp
                        </h6>
                        <div className="filter-product">
                          <ul className="filter-option">
                            <li>
                              <select
                                type="select"
                                className="select price"
                                value={options.price}
                                onChange={(e) => {
                                  handleOptionChange("price", e.target.value);
                                }}
                              >
                                <option value="0">Giá</option>
                                <option value="price-desc">
                                  Từ cao đến thấp
                                </option>
                                <option value="price-asc">
                                  Từ thấp đến cao
                                </option>
                              </select>
                            </li>
                            <li>
                              <select
                                type="select"
                                className="select category"
                                value={options.category}
                                onChange={(e) => {
                                  handleOptionChange(
                                    "category",
                                    e.target.value
                                  );
                                }}
                              >
                                <option value="0">Danh mục</option>
                                <option value="Dược Phẩm">Dược Phẩm</option>
                                <option value="Chăm sóc sức khoẻ">
                                  Chăm sóc sức khoẻ
                                </option>
                                <option value="Chăm sóc cá nhân">
                                  Chăm sóc cá nhân
                                </option>
                                <option value="Sản phẩm tiện lợi">
                                  Sản phẩm tiện lợi
                                </option>
                                <option value="Thực phẩm chức năng">
                                  Thực phẩm chức năng
                                </option>
                                <option value="Mẹ và bé">Mẹ và bé</option>
                                <option value="Chăm sóc sắc đẹp">
                                  Chăm sóc sắc đẹp
                                </option>
                                <option value="Thiết bị y tế">
                                  Thiết bị y tế
                                </option>
                              </select>
                            </li>
                            <li>
                              <select
                                type="select"
                                className="select brand"
                                value={options.distributor}
                                onChange={(e) => {
                                  handleOptionChange(
                                    "distributor",
                                    e.target.value
                                  );
                                }}
                              >
                                <option value="0">Cty Phân phối</option>
                                <option value="Công ty Dược phẩm TW1">
                                  Công ty Dược phẩm TW1
                                </option>
                                <option value="Dược liệu TW2">
                                  Công ty Cổ phần Dược liệu TW2
                                </option>
                                <option value="Công ty Cổ phần Dược liệu TW3">
                                  Công ty Cổ phần Dược liệu TW3
                                </option>
                                <option value="Phương Nam">
                                  Công ty Cổ phần Dược liệu Phương Nam
                                </option>
                                <option value="Công ty Cổ phần thiết bị Y tế Medinsco">
                                  Công ty Cổ phần thiết bị Y tế Medinsco
                                </option>
                                <option value="Công ty Cổ phần Dược phẩm Imexpharm">
                                  Công ty Cổ phần Dược phẩm Imexpharm
                                </option>
                                <option value="Công ty Cổ phần Dược phẩm O.P.C">
                                  Công ty Cổ phần Dược phẩm O.P.C
                                </option>
                                <option value="Công ty Cổ phần Hóa - Dược phẩm Mekophar">
                                  Công ty Cổ phần Hóa - Dược phẩm Mekophar
                                </option>
                                <option value="Công ty Cổ phần Dược TW Huế">
                                  Công ty Cổ phần Dược TW Huế
                                </option>
                                <option value="Công ty Cổ phần Thiết bị Y tế Vimec">
                                  Công ty Cổ phần Thiết bị Y tế Vimec
                                </option>
                              </select>
                            </li>
                            <li>
                              <select
                                type="select"
                                className="select brand"
                                value={options.name}
                                onChange={(e) => {
                                  handleOptionChange("name", e.target.value);
                                }}
                              >
                                <option value="0">Tên</option>
                                <option value="name-asc">Từ A -&gt; Z</option>
                                <option value="name-desc">Từ Z -&gt; A</option>
                              </select>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {!isOpen && (
                      <div>
                        <div className="search open">
                          <input
                            type="search"
                            className="search-box"
                            placeholder="Tìm kiếm sản phẩm"
                            value={inputSearch}
                            onChange={(e) => handleChangeInputSearch(e)}
                            onKeyUp={(e) => handleKeyUp(e)}
                          />
                          <span
                            className="search-button"
                            onClick={handleSearch}
                          >
                            <span className="search-icon"></span>
                          </span>
                        </div>
                      </div>
                    )}
                    <button className="btn-button btn" onClick={handleProduct}>
                      {!isOpen ? "Thêm mới" : "Trở lại"}
                    </button>
                  </div>
                </div>
                {!isOpen && (
                  <div className="table-body">
                    <div className="table-res">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col" className="name-150">
                              Name
                            </th>
                            <th scope="col" className="">
                              Brand
                            </th>
                            <th scope="col" className="text-center">
                              Description
                            </th>
                            <th scope="col" className="text-center">
                              Image
                            </th>
                            <th scope="col" className="text-center">
                              Price
                            </th>
                            <th scope="col" className="text-center">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts &&
                            filteredProducts?.map((product, index) => {
                              let arrayLink = JSON.parse(product.thumbnail);
                              return (
                                <tr key={index}>
                                  <td>
                                    <div className="first-td px-2 py-1 td1">
                                      {product.title}
                                    </div>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {product.brand}
                                    </p>
                                  </td>
                                  <td className="text-center text-hide">
                                    <div>{product.description}</div>
                                  </td>
                                  <td className="align-middle text-center img-hide">
                                    <div className="img-list">
                                      {arrayLink.map((url, index) => (
                                        <div className="img-inner" key={index}>
                                          <img
                                            style={{
                                              width: "50px",
                                              objectFit: "contain",
                                            }}
                                            src={url}
                                            alt="img"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="align-middle text-center">
                                    <span className="text-secondary text-xs font-weight-bold">
                                      {product.price}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      type="button"
                                      className="btn-edit btn"
                                      onClick={() => {
                                        setIsOpenEdit(true);
                                        setCurrent(product);
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
                                        handleDeleteProductWithId(product.id);
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
                )}
                {isOpen && (
                  <div className="row p-4 mt-4 add-product">
                    <div className="form-group col-md-4">
                      <label className="control-label">Tên sản phẩm </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Tên sản phẩm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="inputAddress">Giá</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label className="control-label">Mã sản phẩm</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Mã sản phẩm"
                        value={keyProduct}
                        onChange={(e) => setKeyProduct(e.target.value)}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label className="control-label">Nhà Cung Cấp</label>
                      <select
                        type="select"
                        className="form-control"
                        value={brand}
                        onChange={(e) => {
                          setBrand(e.target.value);
                        }}
                      >
                        <option value="0">None</option>
                        <option value="Công ty Dược phẩm TW1">
                          Công ty Dược phẩm TW1
                        </option>
                        <option value="Dược liệu TW2">
                          Công ty Cổ phần Dược liệu TW2
                        </option>
                        <option value="Công ty Cổ phần Dược liệu TW3">
                          Công ty Cổ phần Dược liệu TW3
                        </option>
                        <option value="Phương Nam">
                          Công ty Cổ phần Dược liệu Phương Nam
                        </option>
                        <option value="Công ty Cổ phần thiết bị Y tế Medinsco">
                          Công ty Cổ phần thiết bị Y tế Medinsco
                        </option>
                        <option value="Công ty Cổ phần Dược phẩm Imexpharm">
                          Công ty Cổ phần Dược phẩm Imexpharm
                        </option>
                        <option value="Công ty Cổ phần Dược phẩm O.P.C">
                          Công ty Cổ phần Dược phẩm O.P.C
                        </option>
                        <option value="Công ty Cổ phần Hóa - Dược phẩm Mekophar">
                          Công ty Cổ phần Hóa - Dược phẩm Mekophar
                        </option>
                        <option value="Công ty Cổ phần Dược TW Huế">
                          Công ty Cổ phần Dược TW Huế
                        </option>
                        <option value="Công ty Cổ phần Thiết bị Y tế Vimec">
                          Công ty Cổ phần Thiết bị Y tế Vimec
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="inputAddress">Giảm giá</label>
                      <select
                        type="select"
                        className="form-control"
                        value={discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                      >
                        <option value="0">None</option>
                        <option value="1">5%</option>
                        <option value="2">10%</option>
                        <option value="3">15%</option>
                        <option value="4">20%</option>
                        <option value="5">25%</option>
                        <option value="6">30%</option>
                        <option value="7">35%</option>
                        <option value="8">40%</option>
                        <option value="9">45%</option>
                        <option value="10">50%</option>
                        <option value="11">55%</option>
                        <option value="12">60%</option>
                        <option value="13">65%</option>
                        <option value="14">60%</option>
                        <option value="15">75%</option>
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="control-label">Danh Mục</label>
                      <select
                        type="select"
                        className="form-control"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="0">None</option>
                        <option value="Dược Phẩm">Dược Phẩm</option>
                        <option value="Chăm sóc sức khoẻ">
                          Chăm sóc sức khoẻ
                        </option>
                        <option value="Chăm sóc cá nhân">
                          Chăm sóc cá nhân
                        </option>
                        <option value="Sản phẩm tiện lợi">
                          Sản phẩm tiện lợi
                        </option>
                        <option value="Thực phẩm chức năng">
                          Thực phẩm chức năng
                        </option>
                        <option value="Mẹ và bé">Mẹ và bé</option>
                        <option value="Chăm sóc sắc đẹp">
                          Chăm sóc sắc đẹp
                        </option>
                        <option value="Thiết bị y tế">Thiết bị y tế</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <label className="control-label">Mô tả sản phẩm</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        placeholder="Mô tả sản phẩm"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div className="form-group col-md-4 mt-5 btn-file-submit">
                      <div className="upload-file" ref={upload}>
                        <div className="upload-info">
                          <span>
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              className="icon"
                            />
                            Document.pdf
                          </span>
                        </div>
                        <button className="upload-button">
                          <label className="control-label" htmlFor="fileUpload">
                            Upload
                          </label>
                        </button>
                        <div className="upload-hint">Uploading...</div>
                        <div className="upload-process">
                          <FontAwesomeIcon icon={faCheck} className="icon" />
                          Comlpeted
                        </div>
                        <input
                          id="fileUpload"
                          type="file"
                          hidden
                          multiple
                          name="thumbnail"
                          onChange={(e) => handleAnimationFile(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 preview-img mt-3">
                      <div className="preview row">
                        <div className="preview-inner">
                          <div className="img-item">
                            {avatar &&
                              avatar.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="img-link"
                                    style={{
                                      backgroundImage: `url(${item})`,
                                    }}
                                  >
                                    <span
                                      className="btn-delete-img"
                                      onClick={() => handleDeleteAvatar(index)}
                                    >
                                      X
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-4 btn-submit mt-5 text-center btn-file-submit">
                      <button
                        className="submit"
                        onClick={async (e) => {
                          handleCreateProduct();
                          await handleAnimationBtn(e);
                        }}
                      >
                        Thêm Mới
                      </button>
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

export default ManageProduct;
