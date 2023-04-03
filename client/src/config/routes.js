const routes = {
  home: "/",
  cart: "/cart",
  product: "/product",
  category: "/category/:category/:id",
  register: "/auth/register",
  login: "/auth/login",
  recovery: "/auth/login/recovery",
  contact: "/contact",
  policy: "/policy",
  search: "/search",
  sale: "/sale",
  payment: "/payment",
  // private
  admin_login: "/admin/login",
  manage_user: "/manager/admin/manage-users",
  manage_image: "/manager/admin/manage-image",
  manage_cart: "/manager/admin/manage-carts",
  manage_product: "/manager/admin/manage-products",
  manage_profile: "/manager/admin/profile",
  manage_order: "/manager/admin/manage-orders",
  manage_feedback: "/manager/admin/manage-feebacks",
  dashboard: "/manager/admin/dashboard",
  // account
  my_account: "/account",
  my_address: "/account/address",
  // product
  detail_product: "/product/:name/:id",
};

export default routes;
