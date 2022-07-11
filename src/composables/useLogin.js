import { ref } from "vue";
import { projectAuth } from '../firebase/config'

const error = ref(null)

const login = async (email, password) => {
    error.value = null

    try {
        //sign in user (if uder exist) through firebase authentifiction
        const res = await projectAuth.signInWithEmailAndPassword(email, password);
        //when success, error is cleared
        error.value = null
        console.log(res)
        return res
    } catch(err){
        //catch any errors if thrown in "try" block
        console.log(err.value)
        error.value = ('Incorrect Login Credentials')
    }
}

const useLogin = () => {
    //when fired in any components returns 'login' function and 'error' variable
    return { error, login }
}

export default useLogin 


