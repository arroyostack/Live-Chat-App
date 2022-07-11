import {
    ref
} from "vue"
import {
    projectAuth
} from "../firebase/config"


const error = ref(null)

const signup = async (email, password, displayName, image) => {
    //sets error ref to null in case they were errors stored from previous attempts
    error.value = null

    try {
        //create a new user in firestore database with credential provided and store the data into the variable "res"
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Could not complete signup')
        }
        //updates user display name in firestore database
        await  res.user.updateProfile({ displayName })
        // await  res.user.setItem({ img: image })

        //error ref is cleared out
        error.value = null

        return res

    } catch (err) {
        //catch any errors if thrown in "try" block
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup = () => {
    //when fired in any components returns 'signup' function and 'error' variable
    return {
        error,
        signup
    }
}



export default useSignup