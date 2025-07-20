import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "./Layout/RootLayout";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";


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
]);