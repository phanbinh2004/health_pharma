import config from "../config/index";

// Layouts
// import { HeaderOnly } from "../containers/Public/HeaderOnly";

// Pages
import HomePage from "../pages/Home/HomePage";
import Cart from "../pages/Cart/Cart";
import Register from "../pages/Login/Register";
import LoginAmin from "../containers/Auth/Login";
import Recovery from "../pages/Login/Recovery";
import Login from "../pages/Login/Login";
import Contact from "../pages/Contact/Contact";
import Search from "../pages/Search/Search";
import Policy from "../pages/Policy/Policy";
import Sale from "../pages/Sale/Sale";
import DetailProduct from "../pages/Product/DetailProduct";
import Payment from "../pages/Payment/Payment";
// Manage
import ManageUser from "../containers/Private/ManageUser";
import MyAccount from "../pages/MyAccount/MyAccount";
import MyAddress from "../pages/MyAccount/MyAddress";
import ManageProduct from "../containers/Private/ManageProducts";
import DashBoard from "../containers/Private/DashBoard";
import ManageOrder from "../containers/Private/ManageOrder";
import ManageProfile from "../containers/Private/ManageProfile";
import ManageImage from "../containers/Private/ManageImage";
import Category from "../pages/Product/Category";
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.register, component: Register },
  { path: config.routes.admin_login, component: LoginAmin },
  { path: config.routes.login, component: Login },
  { path: config.routes.recovery, component: Recovery },
  { path: config.routes.contact, component: Contact },
  { path: config.routes.policy, component: Policy },
  { path: config.routes.search, component: Search },
  { path: config.routes.sale, component: Sale },
  { path: config.routes.payment, component: Payment },
  { path: config.routes.my_account, component: MyAccount },
  { path: config.routes.my_address, component: MyAddress },
  { path: config.routes.detail_product, component: DetailProduct },
  { path: config.routes.category, component: Category },
];

const privateRoutes = [
  { path: config.routes.manage_user, component: ManageUser },
  { path: config.routes.manage_image, component: ManageImage },
  { path: config.routes.manage_product, component: ManageProduct },
  { path: config.routes.dashboard, component: DashBoard },
  { path: config.routes.manage_order, component: ManageOrder },
  { path: config.routes.manage_profile, component: ManageProfile },
];

export { publicRoutes, privateRoutes };
