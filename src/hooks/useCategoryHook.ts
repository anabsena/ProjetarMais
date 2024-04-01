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
      console.error("Error creating category:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
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
    name: string
  ) => {
    try {
      const response = await categoryApi.categoryControllerUpdate(
        id,
        {name}
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


  return {
    categoryControllerCreate,
    categoryControllerFindAll,
    categoryControllerFindOne,
    categoryControllerUpdate
  };
}

export default useCategoryHook;
