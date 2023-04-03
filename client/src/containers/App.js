// import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import { publicRoutes, privateRoutes } from "../routes/routes";
import { connect } from "react-redux";
import * as actions from "../ultils/constants";
import "./App.scss";
import React from "react";
import Main from "./Admin/Dashboard/Main";
import Admin from "./Admin/Admin";
import { CartProvider } from "../pages/Cart/CartProvider";
function App(props) {
  const { isLoggedIn, userInfo } = props;
  return (
    <CartProvider>
      {isLoggedIn && userInfo?.roleId === "R1" && (
        <div
          style={{
            backgroundColor: "#f2f3f5",
            display: "block",
          }}
        >
          <Main />
          <div
            className="wrap-wrap"
            style={{
              backgroundColor: "#f2f3f5",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <div
              className="wrap"
              style={{
                marginLeft: "284px",
                position: "absolute",
                top: "72px",
                width: "83vw",
                // height: "100%",
              }}
            >
              <Switch>
                {privateRoutes.map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route key={index} path={route.path}>
                      <Page />
                    </Route>
                  );
                })}
              </Switch>
            </div>
          </div>
        </div>
      )}
      {userInfo?.roleId !== "R1" && (
        <div>
          <Header />
          <div style={{ backgroundColor: "#f2f3f5", height: "100%" }}>
            <Switch>
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route key={index} exact path={route.path}>
                    <Page />
                  </Route>
                );
              })}
            </Switch>
          </div>
        </div>
      )}
    </CartProvider>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
