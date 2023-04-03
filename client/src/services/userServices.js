import axios from "../axios";
const handleLoginUser = (email, password) => {
  return axios.post("/auth/login", { email, password });
};
const handleCreateUser = (data) => {
  return axios.post("/create-user", data);
};
const handleDelete = (id) => {
  return axios.post(`/api/delete-user?id=${id}`);
};
const handleGetAllUser = (userId) => {
  return axios.get(`/api/get-all-users?id=${userId}`);
};
const handleEditUser = (data) => {
  return axios.post("/api/edit-user", data);
};
// Product
const handleAddProduct = (data) => {
  return axios.post("/api/product/add", data);
};
const handleGetAllProduct = (productId) => {
  return axios.get(`/api/product/read?id=${productId}`);
};
const handleDeleteProduct = (id) => {
  return axios.post(`/api/product/delete?id=${id}`);
};
const handleAddToCart = (data) => {
  return axios.post("/api/cart/add", data);
};
const handleGetAllProductCart = (userId) => {
  return axios.get(`/api/cart/read?id=${userId}`);
};
const handleDeleteProductFromCart = (userId, keyProduct) => {
  return axios.post(`/api/cart/delete?id=${userId}&key=${keyProduct}`);
};
const handleGetCategory = () => {
  return axios.get(`/api/category/read`);
};
export {
  handleAddToCart,
  handleLoginUser,
  handleCreateUser,
  handleGetAllUser,
  handleDelete,
  handleEditUser,
  handleAddProduct,
  handleGetAllProduct,
  handleDeleteProduct,
  handleGetAllProductCart,
  handleDeleteProductFromCart,
  handleGetCategory,
};
