import React, { useEffect } from "react";
import "./App.css";
import "./assets/resource.css";
import Routes from "./routes/index";
import intl from "react-intl-universal";
import { getQueryVariable, getAllUrlParams } from "@/utils/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";

// import { Route, useHistory, withRouter, BrowserRouter } from "react-router-dom";

const locales = {
  "en-us": require("@/locales/en-US.json"),
  "zh-cn": require("@/locales/zh-CN.json"),
};

export default function App() {
  let preLang = getAllUrlParams().lang ||(store.getState().localesReducer.language || "zh-cn");
  useEffect(() => {
    intl
      .init({
        currentLocale: preLang,
        locales,
      })
      .then(() => {
        let lang = getQueryVariable("lang");
        if (preLang !== lang) {
          window.location.search = `?lang=${lang}`;
        }
      });
  });
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
}
