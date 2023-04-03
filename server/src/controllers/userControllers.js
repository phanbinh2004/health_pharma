import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import {
  handleLoggin,
  getAllUsers,
  handleAddNewProduct,
  getAllProducts,
  getDeleteProduct,
  handleAddCart,
  getAllProductsCart,
  handleDeleteProductCartUser,
  getAllCategory,
} from "../services/userServices";
const handleUserLogin = async (req, res, next) => {
  // Validate thông tin người dùng
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input required",
    });
  } else {
    let response = await handleLoggin(email, password);
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      user: response.user ? response.user : {},
    });
  }
};
let handleGetAllUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter requied",
      users: [],
    });
  }
  let users = await getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};
let handleGetAllProduct = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter requied",
      products: [],
    });
  }
  let products = await getAllProducts(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    products,
  });
};
let handleAddProduct = async (req, res, next) => {
  let arrPath = [];
  if (!req.files) {
    next(new Error("No file uploaded!"));
    return;
  } else {
    req?.files?.forEach((item, index) => {
      arrPath[index] = item.path;
    });
  }
  const dataProduct = req.body;
  if (!dataProduct) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter requied",
      users: [],
    });
  }
  let response = await handleAddNewProduct({ ...dataProduct, arrPath });
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};
let handleDeleteProduct = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter requied",
    });
  }
  await getDeleteProduct(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
  });
};
let handleUploadImage = async (req, res) => {
  try {
    const fileUpload = req.files;
    return res.status(200).json("ok");
  } catch (e) {}
};

let handleAddToCart = async (req, res) => {
  let dataProduct = req.body;
  if (!dataProduct) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  } else {
    let response = await handleAddCart(dataProduct);
    return res.status(200).json(response);
  }
};
let handleGetProductCart = async (req, res) => {
  let userId = req.query.id;
  if (!userId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter requied",
      products: [],
    });
  }
  let products = await getAllProductsCart(userId);
  return res.status(200).json({
    errCode: products.errCode,
    errMessage: products.errMessage,
    products: products.products,
  });
};
let handleDeleteProductCart = async (req, res) => {
  let idUser = req.query.id;
  let keyProduct = req.query.key;
  if (!idUser && !keyProduct) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter requied",
    });
  }
  let response = await handleDeleteProductCartUser(idUser, keyProduct);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};
let handleGetCategory = async (req, res) => {
  let categories = await getAllCategory();
  return res.status(200).json({
    errCode: categories.errCode,
    errMessage: categories.errMessage,
    categories: categories.categories,
  });
};
export {
  handleUserLogin,
  handleGetAllUser,
  handleAddProduct,
  handleGetAllProduct,
  handleDeleteProduct,
  handleUploadImage,
  handleAddToCart,
  handleGetProductCart,
  handleGetCategory,
  handleDeleteProductCart,
};
