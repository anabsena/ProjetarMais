import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'




// Crie uma instância Axios personalizada
const apiInterceptorInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // Substitua pela URL da sua API
})

// Interceptor para solicitações
apiInterceptorInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        // Realize as ações de interceptação aqui, se necessário
        // Por exemplo, você pode adicionar headers personalizados
        //config.headers['Authorization'] = 'Bearer seu-token-aqui';
        console.log(config)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Interceptor para respostas
apiInterceptorInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Realize as ações de interceptação na resposta aqui, se necessário
        return response
    },
    (error) => {
        // Lidar com erros de resposta aqui, se necessário
        return Promise.reject(error)
    }
)

export default apiInterceptorInstance
