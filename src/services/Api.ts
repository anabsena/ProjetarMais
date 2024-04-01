
import {
    AuthApi, CategoryApi, Configuration, PhotoApi, ProjectApi, UserApi
} from './api-back'
import apiInterceptorInstance from './interceptor'


const configuration = new Configuration({
    basePath: import.meta.env.VITE_BASE_API
})

const authApi = new AuthApi(configuration, undefined, apiInterceptorInstance)
const projectApi = new ProjectApi(configuration, undefined, apiInterceptorInstance)
const userApi = new UserApi(configuration, undefined, apiInterceptorInstance)
const photoApi = new PhotoApi(configuration, undefined, apiInterceptorInstance)
const categoryApi = new CategoryApi(configuration, undefined, apiInterceptorInstance)



export {
    authApi,
    projectApi,
    userApi,
    photoApi,
    categoryApi
}
