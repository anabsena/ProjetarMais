import { Navigate } from "react-router-dom";
import SignIn from "../screens/Admin/loginAdmin/SignIn";
import PublicLayout from "../components/template";
import AboutUsScreen from "../screens/Public/AboutUs/AboutUseScreen";
import ContactScreen from "../screens/Public/Contact/ContactScreen";
import ProjectidScreen from "../screens/Public/Project/ProjectId/ProejctIdScreen";
import ProjectCategoryScreen from "../screens/Public/Project/ProjectCategory/ProjectCategoryScreen";
import ServicesScreen from "../screens/Public/Sevices/ServicesScreen";
import HomeNew from "../screens/Public/home/HomeNew";
import ProjectAllNew from "../screens/Public/Project/ProjectAllNew";


export default function PublicRoute() {
  return [
    {
      path: "*",
      element: <Navigate to="/home" replace />,
    },
    {
      path: '/home',
      element: <HomeNew />,
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
      element: <PublicLayout><ProjectAllNew /></PublicLayout>,
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
