import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "./Layout/RootLayout";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AuthLayout from "./Layout/AuthLayout";
import WorkSheet from "./Pages/DashBoard/WorkSheet";
import DashboardHome from "./Pages/DashBoard/DashboardHome";
import PrivateRoute from "./Context/PrivateRoute";
import DashboardLayout from "./Layout/DashboardLayout";
import AllEmployeeList from "./Pages/DashBoard/AllEmployeeList";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
            path:"/contact",
            Component:Contact,
        }
    ]
  },
    {
    path :"/",
    Component:AuthLayout,
    children:
    [
        {
            path:'login',
            Component:Login,
        },
        {
            path:'register',
            Component:Register,
        },
    ]
  },
   {
     path :"/dashboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:
    [
      {
        index:true,
        Component:DashboardHome,
      },
      {
        path:'worksheet',
        Component:WorkSheet,
      }, 
      {
        path:'allemployeelist',
        Component:AllEmployeeList,
      }, 
    ]
  }
]);