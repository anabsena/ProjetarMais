import { photoApi } from "../services/Api"

function usePhotoHook() {
    const photoControllerCreate = async (
        projectId: string,
        file: File
    ) => {
        try {

            const response = await photoApi.photoControllerCreate(projectId, file)

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
    }
    const photoControllerFindAll = async (
        projectId: string,
        photos: string,
        page: number,
        perPage: number
    ) => {
        try {

            const response = await photoApi.photoControllerFindAll(photos, page, perPage, projectId)

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
    }
    const photoControllerFindOne = async (
        id: string,
        
    ) => {
        try {

            const response = await photoApi.photoControllerFindOne(id)

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
    }
    const photoControllerUpdate = async (
        projectId: string,
        photos: object[]
        
    ) => {
        try {

            const response = await photoApi.photoControllerUpdate(projectId, {photos})

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
    }
    return {
        photoControllerCreate,
        photoControllerFindAll,
        photoControllerFindOne,
        photoControllerUpdate

    }
    
}
export default usePhotoHook