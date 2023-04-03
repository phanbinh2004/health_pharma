import React from "react/";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import App from "./containers/App";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Main from "./containers/Admin/Dashboard/Main";
const { store, persistor } = reduxStore();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
