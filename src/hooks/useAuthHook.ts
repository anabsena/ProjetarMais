import { useNavigate } from 'react-router-dom'
import { apiSignOut } from '../services/AuthService'
import { authApi } from '../services/Api'

function useAuthHook() {


    const navigate = useNavigate()



    const signIn = async (
        email: string,
        password: string
    ) => {
        try {
            const { data } = await authApi.authControllerLogin(
                email,
                password,
            )
//@ts-ignore
            const { access_token: accessToken } = data

            localStorage.setItem('token', accessToken)

            if (accessToken) {
                window.location.pathname ='/projects';
            }
            return {
                status: 'success',
                message: '',
            }
        } catch (error: any) {
           
        }
    }

  
    const handleSignOut = () => {

        localStorage.removeItem('token')
        navigate('/login')
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {

        signIn,
        signOut,
        

    }
}

export default useAuthHook
