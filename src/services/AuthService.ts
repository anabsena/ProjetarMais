import ApiService from './ApiService'

export type SignInCredential = {
    email: string
    password: string
}
export type SignInResponse = {
    token: string
    user: {
        userName: string
        authority: string[]
        email: string
    }
}
export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}
export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: '/sign-in',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    try {
        const response = await ApiService.fetchData({
            url: '/sign-out',
            method: 'post',
        })

        // Verifique se a resposta está no formato esperado e retorne os dados necessários, se houver.
        const responseData = response.data || null

        return responseData
    } catch (error) {
        // Se houver um erro, você pode lidar com isso de acordo com suas necessidades.
        console.error('Erro ao fazer o logout:', error)

        // Você pode relançar o erro ou retornar uma mensagem de erro personalizada.
        return null
    }
}

// export async function apiForgotPassword(data: ForgotPassword) {
//     return ApiService.fetchData({
//         url: '/forgot-password',
//         method: 'post',
//         data,
//     })
// }

// export async function apiResetPassword(data: ResetPassword) {
//     return ApiService.fetchData({
//         url: '/reset-password',
//         method: 'post',
//         data,
//     })
// }
