import { Navigate } from "react-router-dom";
import ListProjects from "../screens/Admin/Project/listProjects.tsx/ListProjects";
import ListAdmin from "../screens/Admin/User/listAdmin.tsx/ListAdmin";
import CreateProject from "../screens/Admin/Project/CreateProject/CreateProject";
import CreateCategory from "../screens/Admin/Project/Category/CreateCategory/CreateCategory";
import ListCategory from "../screens/Admin/Project/Category/ListCategory/ListCategory";
import ListCategoryId from "../screens/Admin/Project/Category/ListCategoryId/ListCategoryId";
import { Home } from "../screens";
import NewUser from "../screens/Admin/User/NewUser/NewUser";
import ViewProject from "../screens/Admin/Project/ViewProject/viewProject";

export default function PrivateRoute() {
  return {
    children: [
        {
            path: "*",
            element: <Navigate to="/admin" />,
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
            element: <CreateCategory/>,
          },
          {
            path: '/categorys',
            element: <ListCategory/>,
          },
          {
            path: '/categoryId',
            element: <ListCategoryId/>,
          },
          {
            path: '/home',
            element: <Home/>,
          },
          {
            path: '/new-user',
            element: <NewUser/>,
          },
          {
            path: '/project',
            element: <ViewProject/>,
          }
      
    ]
  };
}
