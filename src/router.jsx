import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "./Layout/RootLayout";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AuthLayout from "./Layout/AuthLayout";


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
]);