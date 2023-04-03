import express from "express";
let router = express.Router();
import {
  getHomePage,
  createUser,
  handleDeleteUser,
  handleEditUser,
} from "../controllers/homeControllers";
import {
  handleUserLogin,
  handleGetAllUser,
  // Product
  handleAddProduct,
  handleGetAllProduct,
  handleDeleteProduct,
  handleUploadImage,
  handleAddToCart,
  handleGetProductCart,
  handleDeleteProductCart,
  handleGetCategory,
} from "../controllers/userControllers";
import uploadCloud from "../../middlewares/uploadCloudinary";
let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.post("/auth/login", handleUserLogin);
  router.post("/create-user", createUser);
  router.get("/api/get-all-users", handleGetAllUser);
  router.post("/api/delete-user", handleDeleteUser);
  router.post("/api/edit-user", handleEditUser);
  // product
  router.post(
    "/api/product/add",
    uploadCloud.array("thumbnail"),
    handleAddProduct
  );
  router.get("/api/product/read", handleGetAllProduct);
  router.get("/api/category/read", handleGetCategory);
  router.post("/api/product/delete", handleDeleteProduct);
  router.post("/api/cart/add", handleAddToCart);
  router.get("/api/cart/read", handleGetProductCart);
  router.post("/api/cart/delete", handleDeleteProductCart);
  return app.use("/", router);
};

export default initWebRoutes;
