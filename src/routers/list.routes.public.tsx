
import { Navigate } from "react-router-dom";
import { Home } from "../screens";
import SignIn from "../screens/Admin/loginAdmin/SignIn";


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
          }
      

      

    ]
  };
}
