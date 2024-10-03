import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "./list.routes.public"; 
import PrivateRoutes from "./list.routes.private"; 


export const AppRoutes = () => {
  // Função para decodificar JWT
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt?.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    }
    return false;
  };

  const router = createBrowserRouter([
    ...PublicRoutes(),  
    ...(checkAuth() ? PrivateRoutes() : []), 
  ]);

  return <RouterProvider router={router} />;
};
