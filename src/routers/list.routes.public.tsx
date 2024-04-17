
import { Navigate } from "react-router-dom";
import { Home } from "../screens";
import SignIn from "../screens/Admin/loginAdmin/SignIn";
import AboutUs from "../screens/Public/AboutUs/AboutUs";
import Contact from "../screens/Public/Contact/Contact";
import Services from "../screens/Public/Sevices/Services";
import ProjectAll from "../screens/Public/Project/ProjectAll";
import ProjectId from "../screens/Public/Project/ProjectId/ProjectId";
import ProjectCategory  from "../screens/Public/Project/ProjectCategory/ProjectCategory";


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
      },
      {
        path: '/serviços',
        element: <Services />,
      },
      {
        path: '/projetos',
        element: <ProjectAll />,
      },
      {
        path: '/projetos/projeto',
        element: <ProjectId />,
      },
      {
        path: '/serviços/projeto',
        element: <ProjectCategory />,
      }




    ]
  };
}
