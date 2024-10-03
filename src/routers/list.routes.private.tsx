import { Navigate } from "react-router-dom";
import PrivateTemplate from "../components/template-private";
import ListProjectsScreen from "../screens/Admin/Project/listProjects.tsx/ListProjectsScreen";
import ProjectidAdminScreen from "../screens/Admin/Project/ProjectId/ProejctIdScreen";
import UpdateProjectScreen from "../screens/Admin/Project/UpdateProject/UpdateProjectScreen";
import CreateProjectScreen from "../screens/Admin/Project/CreateProject/CreateProjectScreen";
import CreateCategoryScreen from "../screens/Admin/Project/Category/CreateCategory/CreateCategoryScreen";
import ListCategoryScreen from "../screens/Admin/Project/Category/ListCategory/ListCategoryScreen";
import ListCategoryIdScreen from "../screens/Admin/Project/Category/ListCategoryId/ListCategoryIdScreen";
import { UpdateCategoryScreen } from "../screens/Admin/Project/Category/UpdateCategory/UpdateCategoryScreen";
import ViewProjectScreen from "../screens/Admin/Project/ViewProject/ViewProjectScreen";
import ListAdmin from "../screens/Admin/User/listAdmin/ListAdmin";
import NewUser from "../screens/Admin/User/NewUser/NewUser";

export default function PrivateRoutes() {
  return [
    {
      path: "*",
      element: <Navigate to="/home" />,
    },
    {
      path: "/projects",
      element: <PrivateTemplate><ListProjectsScreen /></PrivateTemplate>,
    },
    {
      path: "/projetos/projetoId",
      element: <PrivateTemplate><ProjectidAdminScreen /></PrivateTemplate>,
    },
    {
      path: "/projetos/editProject",
      element: <PrivateTemplate><UpdateProjectScreen /></PrivateTemplate>,
    },
    {
      path: "/admin",
      element: <PrivateTemplate><ListAdmin /></PrivateTemplate>,
    },
    {
      path: "/new-project",
      element: <PrivateTemplate><CreateProjectScreen /></PrivateTemplate>,
    },
    {
      path: "/new-category",
      element: <PrivateTemplate><CreateCategoryScreen /></PrivateTemplate>,
    },
    {
      path: "/categorys",
      element: <PrivateTemplate><ListCategoryScreen /></PrivateTemplate>,
    },
    {
      path: "/categoryId",
      element: <PrivateTemplate><ListCategoryIdScreen /></PrivateTemplate>,
    },
    {
      path: "/update-category",
      element: <PrivateTemplate><UpdateCategoryScreen /></PrivateTemplate>,
    },
    {
      path: "/new-user",
      element: <PrivateTemplate><NewUser /></PrivateTemplate>,
    },
    {
      path: "/project",
      element: <PrivateTemplate><ViewProjectScreen /></PrivateTemplate>,
    },
  ];
}
