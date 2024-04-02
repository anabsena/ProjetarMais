
import { Navigate } from "react-router-dom";
import { Home } from "../screens";
import SignIn from "../screens/Admin/loginAdmin/SignIn";
import AboutUs from "../screens/Public/AboutUs/AboutUs";
import Contact from "../screens/Public/Contact/Contact";


export default function PublicRoute() {
  return {
    children: [
      {
        path: "*",
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sobre-nos',
        element: <AboutUs />,
      },
      {
        path: '/contato',
        element: <Contact />,
      }




    ]
  };
}
