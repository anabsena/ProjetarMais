import { projectApi } from "../services/Api";


function useProjectHook() {
  const projectControllerCreate = async (
    name: string,
    description: string,
    especificDetails: string,
    projectCategoryId:string
  ) => {
    try {
    const response = await projectApi.projectControllerCreate(
      {name,
      description,
      especificDetails,
    projectCategoryId}
    )
    const { data, status, statusText} = response

     

      return {
        status: status,
        message: statusText,
        data: data,
  }
}catch (error: any) {
    console.error("Error fetching users:", error);

    return {
      status: "error",
      message: error.message,
      data: null,
    };
  }
}
  const projectControllerFindAll = async (
    name?: string,
    especificDetails?: string,
    description?: string,
    page?: number,
    perPage?: number
  ) => {
    try {
      //@ts-ignore
      const response = await projectApi.projectControllerFindAll(name, especificDetails ,description, perPage, page);
      console.log('hook', response)

      const { data, status, statusText} = response

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
  const projectControllerFindOne = async (
    id:string
  ) => {
    try {
      const response = await projectApi.projectControllerFindOne(id);

      const { data, status, statusText} = response

     

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
  const projectControllerUpdate = async (
    id:string,
    name?: string,
    description?: string,
    especificDetails?: string
  ) => {
    try {
      const response = await projectApi.projectControllerUpdate(id,
        {name,
        description,
        especificDetails
    });

      const { data, status, statusText} = response

     

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
  const projectControllerDelete = async (
    id:string
  ) => {
    try {
      const response = await projectApi.projectControllerDelete(id);

      const { data, status, statusText} = response

     

      return {
        status: status,
        message: statusText,
        data: data,
      };
    } catch (error: any) {
      console.error("Error delete users:", error);

      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }
  };
 

  return {
    projectControllerCreate,
    projectControllerFindAll,
    projectControllerFindOne,
    projectControllerUpdate,
    projectControllerDelete
  };
}

export default useProjectHook
