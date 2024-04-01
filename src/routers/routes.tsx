import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PublicRoute from "./list.routes.public.tsx";
import PrivateRoute from "./list.routes.private.tsx";


export const AppRoutes = () => {

  

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

   const checkAuth = () => {
    const token = localStorage.getItem('token')
    if (token){
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    }
    return false;
  }

  const router = createBrowserRouter([
    checkAuth() ? PrivateRoute() : PublicRoute(),
  ]);

  return <RouterProvider router={router} />;
};
