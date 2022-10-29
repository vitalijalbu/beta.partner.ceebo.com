import React, { useState, useEffect, useRef } from "react";
import { App, View, f7 } from "framework7-react";
import Footer from "./Includes/Footer";
import routes from "../js/routes";
import { Device } from "@capacitor/device";
import store from "../store/";
import { generateUUID } from "../services/helpers";

const MyApp = () => {
  /*
  const logDeviceInfo = async () => {
    const info = await Device.getInfo();
  
    console.log('device-info', info);
  };

  //const [activeTab, setActiveTab] = useState('today');
  //const previousTab = useRef(null);
/*const pulseAppOrders = async () => {
  try {
    getPulseOrders()
    .then(({ data }) => {
      setPulseData(data?.data);
      console.log('success-get-pulse', data.total_count)
      createStore({audit: pulse});
    })
    .catch((err) => {
      console.log('error-pulse')
    });
  } catch (error) {
      console.log("asyncs-error", error);
  }
};*/

  // Framework7 Parameters
  const f7params = {
    version: "1.0.0",
    language: "it",
    debugger: import.meta.env.VITE_APP_DEBUG,
    name: "Ceebo Ristorante", // App name
    stackPages: true,
    theme: "ios", // Automatic theme detection
    // App routes
    store: store,
    // App routes
    routes: routes,
    pushStateSeparator: "/",
    on: {
      //each object key means same name event handler
      init: function (page) {
        // Create Create session GUID
        generateUUID();
      },
      pageInit: function (page) {
        //console.log('🌿 success running app', pulse);
        f7.store.dispatch("getSummary");
      },
      
    },
  };

  return (
    <App {...f7params}>
      {/* Your main view, should have "view-main" class */}
      <View
        main
        browserHistory
        browserHistorySeparator=""
        browserHistoryInitialMatch={true}
        browserHistoryStoreHistory={false}
        animate={false}
        stackedPages={false}
        url="/"
        //preloadPreviousPage={false}
        masterDetailBreakpoint={768}
        className="safe-areas"
        passRouteParamsToRequest={true}
      >
        {/*<div className="page-detail-placeholder">Select something on left</div>*/}
      
      <Footer />
      </View>
    </App>
  );
};
export default MyApp;
