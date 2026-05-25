import { Navigate } from "react-router-dom";
import { Home } from "../screens";
import SignIn from "../screens/Admin/loginAdmin/SignIn";
import PublicLayout from "../components/template";
import AboutUsScreen from "../screens/Public/AboutUs/AboutUseScreen";
import ContactScreen from "../screens/Public/Contact/ContactScreen";
import ProjectAllScreen from "../screens/Public/Project/ProjectAllScreen";
import ProjectidScreen from "../screens/Public/Project/ProjectId/ProejctIdScreen";
import ProjectCategoryScreen from "../screens/Public/Project/ProjectCategory/ProjectCategoryScreen";
import ServicesScreen from "../screens/Public/Sevices/ServicesScreen";


export default function PublicRoute() {
  return [
    {
      path: "*",
      element: <Navigate to="/home" replace />,
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
      element: <PublicLayout><AboutUsScreen /></PublicLayout>,
    },
    {
      path: '/contato',
      element: <PublicLayout><ContactScreen /></PublicLayout>,
    },
    {
      path: '/serviços',
      element: <PublicLayout><ServicesScreen /></PublicLayout>,
    },
    {
      path: '/projetos',
      element: <PublicLayout><ProjectAllScreen /></PublicLayout>,
    },
    {
      path: '/projetos/projeto',
      element: <PublicLayout><ProjectidScreen /></PublicLayout>,
    },
    {
      path: '/serviços/projeto',
      element: <PublicLayout><ProjectCategoryScreen /></PublicLayout>,
    }
  ];
}
