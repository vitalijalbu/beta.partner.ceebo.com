import { useStore, f7 } from 'framework7-react';
import { Preferences } from '@capacitor/preferences';

import Login from "../pages/Auth/";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import Home from "../pages/Home";
import HomeView from "../pages/Home/View";

import Orders from "../pages/Orders/";
import OrderView from "../pages/Orders/View";

/* Couriers */
import Couriers from "../pages/Couriers/";
import CourierView from "../pages/Couriers/View";
import CourierOrders from "../pages/Couriers/Orders";
import CourierDeposits from "../pages/Couriers/Deposits";

/* Customers */
import Customers from "../pages/Customers/";
import CustomerView from "../pages/Customers/View";

/* Delivery */
import Delivery from "../pages/Delivery/";
import DeliveryView from "../pages/Delivery/View";

/* Pickup */
import Pickup from "../pages/Pickup/";
import PickupView from "../pages/Pickup/View";


/* Reports */
import Reports from "../pages/Reports/";
import Reviews from "../pages/Reports/Reviews";
import Sales from "../pages/Reports/Sales";

/* Security */
import Settings from "../pages/Settings/";
import SettingsHardware from "../pages/Settings/Hardware";
import SettingsAreas from "../pages/Settings/Areas";
import SettingsAccount from "../pages/Settings/Account";
import SettingsSecurity from "../pages/Settings/Security";
import SettingsBilling from "../pages/Settings/Billing";
import SettingsSupport from "../pages/Settings/Support";
import SettingsListing from "../pages/Settings/Listing";
import Availabilities from "../pages/Menu/Availabilities/";
import Checkout from "../pages/Checkout/";
import NotFoundPage from "../pages/404";


/* Get user localstorage */
const userData = Preferences.get({ key: "user" });

function checkAuth({ to, from, resolve, router, reject }) {
  if (userData.value !== null) {
    //resolve();
    console.log('loggedIn');
    resolve();
    console.log('userData', userData.value);
  } else {
    console.log('Not loggedIn');
    reject();
    f7.view.main.router.navigate('/login');
  }
}

const routes = [
  {
    path: "/offline",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    name: 'home',
    path: "/home",
    component: Home,
    beforeEnter: checkAuth,
    master: true,
    // detail routes
    detailRoutes: [
      {
        path: "/home/:id",
        component: HomeView,
        beforeEnter: checkAuth,
      },
    ],
  },
  {
    name: 'delivery',
    path: "/delivery",
    component: Delivery,
    beforeEnter: checkAuth,
    master: true,
     // detail routes
     detailRoutes: [
      {
        path: "/delivery/:id",
        component: DeliveryView,
        beforeEnter: checkAuth,
      },
    ],
  },
  {
    name: 'pickup',
    path: "/pickup",
    component: Pickup,
    beforeEnter: checkAuth,
    master: true,
     // detail routes
     detailRoutes: [
      {
        path: "/pickup/:id",
        component: PickupView,
      },
    ],
  },
  {
    name: 'orders',
    path: "/orders",
    component: Orders,
    beforeEnter: checkAuth,
    master: true,
     // detail routes
     detailRoutes: [
      {
        path: "/orders/:id",
        component: OrderView,
      },
    ],
  },
  {
    name: 'couriers',
    path: "/couriers",
    component: Couriers,
    beforeEnter: checkAuth,
    master: true,
     // detail routes
     detailRoutes: [
      {
        path: "/couriers/:id",
        component: CourierView,
      },
      {
        path: "/couriers/:id/orders",
        component: CourierOrders,
      },
      {
        path: "/couriers/:id/deposits",
        component: CourierDeposits,
      },
    ],
  },
  {
    name: 'customers',
    path: "/customers",
    component: Customers,
    beforeEnter: checkAuth,
    master: true,
     // detail routes
     detailRoutes: [
      {
        path: "/customers/:id",
        component: CustomerView,
      },
    ],
  },
  {
    name: 'reports',
    path: "/reports",
    component: Reports,
    beforeEnter: checkAuth,
     // detail routes
     detailRoutes: [
      {
        path: "/reports/sales",
        component: Sales,
      },,
      {
        path: "/reports/reviews",
        component: Reviews,
      },
    ],
  },
  {
    name: "settings",
    path: "/settings",
    component: Settings,
    beforeEnter: checkAuth,
    master: true,
    // detail routes
    detailRoutes: [
      {
        path: "/settings/",
        component: SettingsAccount,
      },
      {
        path: "/settings/account",
        component: SettingsAccount,
      },
      {
        path: "/settings/security",
        component: SettingsSecurity,
      },
      {
        path: "/settings/billing",
        component: SettingsBilling,
      },
      {
        path: "/settings/hardware",
        component: SettingsHardware,
      },
      {
        path: "/settings/areas",
        component: SettingsAreas,
      },
      {
        path: "/settings/listing",
        component: SettingsListing,
      },
      {
        path: "/settings/support",
        component: SettingsSupport,
      },
    ],
  },
  {
    name: "availabilities",
    path: "/availabilities",
    component: Availabilities,
    beforeEnter: checkAuth
  },
  {
    name: "checkout",
    path: "/checkout",
    component: Checkout,
    beforeEnter: checkAuth
  },
  {
    path: "(.*)",
    component: NotFoundPage
  }
];

export default routes;
