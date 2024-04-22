import { categoryApi } from "../services/Api";

function useCategoryHook() {
  const categoryControllerCreate = async (name: string, description: string) => {
    try {
      const response = await categoryApi.categoryControllerCreate({ name, description });
  
      const { data, status, statusText } = response;
  
      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        return {
          status: "error",
          message: "Categoria já existe",
          data: null,
        };
      } else {
        console.error("Error creating category:", error);
        return {
          status: "error",
          message: error.message,
          data: null,
        };
      }
    }
  };
  

  const categoryControllerFindAll = async (
    name: string,
    page: number,
    perPage: number
  ) => {
    try {
      const response = await categoryApi.categoryControllerFindAll(
        page,
        perPage,
        name
      );

      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error fetching categories:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
  };
  const categoryControllerFindOne = async (
    id:string
  ) => {
    try {
      const response = await categoryApi.categoryControllerFindOne(
        id
      );

      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error fetching categories:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
  };
  const categoryControllerUpdate = async (
    id:string,
    name: string,
    description: string
  ) => {
    try {
      const response = await categoryApi.categoryControllerUpdate(
        id,
        {name, description}
      );

      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error fetching categories:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
    
  };
  const categoryControllerDelete = async (
    id:string
  ) => {
    try {
      const response = await categoryApi.categoryControllerDelete(
        id
      );

      const { data, status, statusText } = response;

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error delete categories:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
    
  };


  return {
    categoryControllerCreate,
    categoryControllerFindAll,
    categoryControllerFindOne,
    categoryControllerUpdate,
    categoryControllerDelete
  };
}

export default useCategoryHook;
