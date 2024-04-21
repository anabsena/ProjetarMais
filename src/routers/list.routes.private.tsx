import { Navigate } from "react-router-dom";
import ListProjects from "../screens/Admin/Project/listProjects.tsx/ListProjects";
import ListAdmin from "../screens/Admin/User/listAdmin/ListAdmin";
import CreateProject from "../screens/Admin/Project/CreateProject/CreateProject";
import CreateCategory from "../screens/Admin/Project/Category/CreateCategory/CreateCategory";
import ListCategory from "../screens/Admin/Project/Category/ListCategory/ListCategory";
import ListCategoryId from "../screens/Admin/Project/Category/ListCategoryId/ListCategoryId";
import { Home } from "../screens";
import NewUser from "../screens/Admin/User/NewUser/NewUser"
import ViewProject from "../screens/Admin/Project/ViewProject/ViewProject";
import AboutUs from "../screens/Public/AboutUs/AboutUs";
import Contact from "../screens/Public/Contact/Contact";
import Services from "../screens/Public/Sevices/Services";
import ProjectAll from "../screens/Public/Project/ProjectAll";
import ProjectId from "../screens/Public/Project/ProjectId/ProjectId";
import ProjectCategory from "../screens/Public/Project/ProjectCategory/ProjectCategory";
import UpdateCategory from "../screens/Admin/Project/Category/UpdateCategory/UpdateCategory";

export default function PrivateRoute() {
  return {
    children: [
      {
        path: "*",
        element: <Navigate to="/home" />,
      },
      {
        path: '/projects',
        element: <ListProjects />,
      },
      {
        path: '/admin',
        element: <ListAdmin />,
      },
      {
        path: '/new-project',
        element: <CreateProject />,
      },
      {
        path: '/new-category',
        element: <CreateCategory />,
      },
      {
        path: '/categorys',
        element: <ListCategory />,
      },
      {
        path: '/categoryId',
        element: <ListCategoryId />,
      },
      {
        path: '/update-category',
        element: <UpdateCategory />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/new-user',
        element: <NewUser />,
      },
      {
        path: '/project',
        element: <ViewProject />,
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
        element: <Services/>,
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
