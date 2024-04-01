import { useNavigate } from 'react-router-dom'
import { SignInCredential, SignUpCredential, apiSignOut } from '../services/AuthService'
import { authApi } from '../services/Api'
import appConfig from '../configs/app.config'

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

    const signUp = async (values: SignUpCredential) => {
        // try {
        //     if (!values.phoneValue.startsWith('+')) {
        //         values.phoneValue = '+55' + values.phoneValue;
        //     }
        //     const phone: SplitPhoneNumber = splitPhoneNumber(
        //         formatPhoneNumberIntl(values.phoneValue || '')
        //     )
        //     const userName = values.userName || ''
        //     const userEmail = values.email || ''
        //     const password = values.password || ''
        //     const countryCodePhone = phone.countryCode
        //     const areaCodePhone = phone.areaCode
        //     const phoneNumber = phone.phoneNumber
        //     const document = values.documentUserValue || ''
        //     const userPhoto = values.photoFace || ''

        //     const dateArr = values.dateOfBirth!.split('/')
        //     const dateInvert = dateArr.reverse()
        //     const dateOfBirth = dateInvert.join('/').replaceAll('/', '-')


        //     const response =
        //         await initialSubscribeApi.initialSubscribeControllerCreateClub(
        //             userName,
        //             userEmail,
        //             password,
        //             countryCodePhone,
        //             areaCodePhone,
        //             phoneNumber,
        //             dateOfBirth,
        //             document,
        //             userPhoto
        //         )
        //     if (response) {
                
        //         return {
        //             status: 201,
        //             message: '',
        //         }
        //     }



        // } catch (errors: any) {
        //     return {
        //         status: 401,
        //         message: `Error: ${errors}`,
        //     }
        // }
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
        signUp,
        signOut,
        

    }
}

export default useAuthHook
