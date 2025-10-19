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
import EmployeeList from "./Pages/DashBoard/EmployeeList";
import EmployeeDetails from "./Pages/DashBoard/EmployeeDetails";
import Payment from "./Pages/DashBoard/Payment/Payment";
import PaymentHistory from "./Pages/DashBoard/Payment/PaymentHistory";
import Progress from "./Pages/DashBoard/Progress";
import HRRoute from "./Context/HRRoute";
import AdminRoute from "./Context/AdminRoute";
import Payroll from "./Pages/DashBoard/Payroll";
import AdminMessages from "./Pages/DashBoard/AdminMessages";
import AllFeaturedProducts from "./Pages/AllFeaturedProducts";
import ProjectDetails from "./Pages/ProjectDetails";
import SalesHistory from "./Pages/SalesHistory";
import FeaturedProductDetail from "./Pages/FeaturedProductDetail";


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
            path:"/allfeatured",
            Component:AllFeaturedProducts,
        },
        {
          path:"/sales-history",
          Component:SalesHistory,
        },
        {
           path:"/project/:id",
           Component:ProjectDetails,
        },
        {
          path:"/featuredproductdetail/:id",
          Component:FeaturedProductDetail,
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
        path:'employeelist',
        element:<HRRoute><EmployeeList></EmployeeList></HRRoute>
      },
      {
       path :"employee-details/:email", 
       element:<HRRoute><EmployeeDetails></EmployeeDetails></HRRoute>
       } ,
      {
        path:'allemployeelist',
        element:<AdminRoute><AllEmployeeList/></AdminRoute>
      }, 
      {
        path:'adminmessages',
        element:<AdminRoute><AdminMessages/></AdminRoute>
      }, 
      {
        path:'payment/:user_id',
        Component:Payment,
      },
        {
        path: "paymenthistory",
        element:<PaymentHistory />
      },
      {
        path: "payroll",
        element:<Payroll></Payroll>
      },
      
        {
        path: "progress",
        element:<HRRoute><Progress></Progress></HRRoute>
      },
    ]
  }
]);