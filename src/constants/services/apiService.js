import axios from "axios"
import { clearStatus, setError, setLoading, setSuccess } from "../Redux/ParentSlice"

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
export const LoginUser = async (userData, dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${API_BASE_URL}auth/login`,
            {
                email: userData.email,
                password: userData.password
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
        dispatch(setSuccess('Login Successful'))
        if (!response) {
            dispatch(setError('Something Went Wrong, Try Again Later'))
        }
        return response.data
    } catch (error) {
        console.log(error)
        dispatch(setError('Server Is down, Try Again Later'))
        throw error
    } finally {
        dispatch(clearStatus())
    }
}


export const registerUser = async (userData, dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${API_BASE_URL}auth/register`,
            {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        )
        dispatch(setSuccess('Registered Successfully'))

        if (!response) {
            dispatch(setError('Something Went Wrong, Try Again Later'))
        }
        return response.data
    } catch (error) {
        console.log(error)
        dispatch(setError('Server Is down, Try Again Later'))
        throw error
    } finally {
        dispatch(setLoading(false))
    }
}

