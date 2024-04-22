import { userApi } from "../services/Api";

function useUserHook() {
  const userControllerCreate = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await userApi.userControllerCreate({ name, email, password });
      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error creating user:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
  };

  const userControllerFindAll = async (
    name?: string,
    page?: number,
    perPage?: number
  ) => {
    try {
      const response = await userApi.userControllerFindAll(name, page, perPage);
      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error fetching users:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
  };
  const userControllerFindone = async (
    id: string,
  ) => {
    try {
      const response = await userApi.userControllerFindOne(id);
      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error fetching users:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
  };

 

  const userControllerUpdate = async (
    id: string,
    userData: { name: string; password: string }
  ) => {
    try {
      const response = await userApi.userControllerUpdate(id, userData);
      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error updating user:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
  };
  const userControllerDelete = async (
    id: string,
  ) => {
    try {
      const response = await userApi.userControllerDelete(id);
      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error updating user:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
  };

  return {
    userControllerCreate,
    userControllerFindAll,
    userControllerFindone,
    userControllerUpdate,
    userControllerDelete
  };
}

export default useUserHook;
