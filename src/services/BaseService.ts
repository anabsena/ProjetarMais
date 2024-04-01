import axios from 'axios'
import appConfig from '../configs/app.config'
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from '../constants/api.constant'
import { PERSIST_STORE_NAME } from '../constants/app.constant'
import deepParseJson from '../utils/deepParseJson'


const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let accessToken = (persistData as any).auth.session.token

        if (!accessToken) {
           
            accessToken = localStorage.getItem('token')
        }

        if (accessToken) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            localStorage.removeItem('token')
        }

        return Promise.reject(error)
    }
)

export default BaseService
