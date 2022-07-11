import {
    ref
} from "vue";
import {
    projectAuth
} from '../firebase/config'

const error = ref(null)

const logout = async () => {
    error.value = null
    try {
        // this firebase method logs user out from account
        const res = await projectAuth.signOut()
    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }
}

const useLogout = () => {
    // this function returns 'logout' and 'error' and make it available in 'Navbar' component
    return {
        logout,
        error
    }
}

export default useLogout