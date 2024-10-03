import { Navigate } from "react-router-dom";
import ListProjects from "../screens/Admin/Project/listProjects.tsx/ListProjects";
import ListAdmin from "../screens/Admin/User/listAdmin/ListAdmin";
import CreateProject from "../screens/Admin/Project/CreateProject/CreateProject";
import CreateCategory from "../screens/Admin/Project/Category/CreateCategory/CreateCategory";
import ListCategory from "../screens/Admin/Project/Category/ListCategory/ListCategory";
import ListCategoryId from "../screens/Admin/Project/Category/ListCategoryId/ListCategoryId";
import ViewProject from "../screens/Admin/Project/ViewProject/ViewProject";
import UpdateCategory from "../screens/Admin/Project/Category/UpdateCategory/UpdateCategory";
import ProjectIdAdmin from "../screens/Admin/Project/ProjectId/ProjectId";
import NewUser from "../screens/Admin/User/NewUser/NewUser";
import UpdateProject from "../screens/Admin/Project/UpdateProject/UpdateProejct";

export default function PrivateRoutes() {
  return [
    {
      path: "*",
      element: <Navigate to="/home" />,
    },
    {
      path: "/projects",
      element: <ListProjects />,
    },
    {
      path: "/projetos/projetoId",
      element: <ProjectIdAdmin />,
    },
    {
      path: "/projetos/editProject",
      element: <UpdateProject />,
    },
    {
      path: "/admin",
      element: <ListAdmin />,
    },
    {
      path: "/new-project",
      element: <CreateProject />,
    },
    {
      path: "/new-category",
      element: <CreateCategory />,
    },
    {
      path: "/categorys",
      element: <ListCategory />,
    },
    {
      path: "/categoryId",
      element: <ListCategoryId />,
    },
    {
      path: "/update-category",
      element: <UpdateCategory />,
    },
    {
      path: "/new-user",
      element: <NewUser />,
    },
    {
      path: "/project",
      element: <ViewProject />,
    },
  ];
}
