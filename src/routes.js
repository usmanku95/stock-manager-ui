/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Login from "views/Login.jsx";
import Register from "views/Register.jsx";

import UnAuthorized from "views/UnAuthorized.jsx";
import UserProfile from "views/UserProfile.jsx";
import AddItem from "views/AddItem";
import ViewItems from "views/ViewItems";
import CreateOrder from "views/CreateOrder";
import ViewLogs from "views/ViewLogs";

import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";

const dashboardRoutes = [
  //mine
  {
    path: "/createOrder",
    name: "Orders",
    icon: "pe-7s-hammer",
    component: CreateOrder,
    layout: "/admin"
  },
  // {
  //   path: "/addItem",
  //   name: "Add Item",
  //   icon: "pe-7s-plus",
  //   component: AddItem,
  //   layout: "/admin"
  // },
  {
    path: "/viewItems",
    name: "Items",
    icon: "pe-7s-note2",
    component: ViewItems,
    layout: "/admin"
  },
  {
    path: "/viewLogs",
    name: "Logs",
    icon: "pe-7s-note2",
    component: ViewLogs,
    layout: "/admin"
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "pe-7s-graph",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "pe-7s-user",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "pe-7s-note2",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "pe-7s-map-marker",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade,
  //   layout: "/admin"
  // },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    icon: "pe-7s-graph",
    component: UnAuthorized,
    layout: "/admin",
    hideSelf: true
  }
];
export const accountRoutes = [
  {
    path: "/register",
    name: "Register",
    icon: "pe-7s-graph",
    component: Register,
    layout: "/account"
  },
  {
    path: "/login",
    name: "Login",
    icon: "pe-7s-graph",
    component: Login,
    layout: "/account"
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    icon: "pe-7s-graph",
    component: UnAuthorized,
    layout: "/account"
  }
];
export default dashboardRoutes;
