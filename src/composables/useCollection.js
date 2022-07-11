import {
    projectFirestore
} from "@/firebase/config";
import {
    ref
} from "vue";


const useCollection = (collection) => {
    //in this istance the errors ref is created inside the function as more than one collection may be used in the project. this error ref variable will be unique to this collection
    //the collectin to request is passed as an argument to 'useCollection' function
    //this makes the composable reusable to request any collection
    const error = ref(null)

    const addDoc = async (doc) => {
        //this asynchronous will eventually post the message to the data base or throw an error
        error.value = null
        try {
            await projectFirestore.collection(collection).add(doc)
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not send the message'
        }
    }

    return { error, addDoc}

}

export default useCollection