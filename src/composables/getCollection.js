import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "vue";

// this composable is responsible for listening to the database collection of messages and returning them in real time
// taking 'collection' as an argument makes this function reusable
const getCollection = (collection) => {
    const documents = ref(null)
    //error ref is inside function in case more collections are used, in which case each one need a unique error message
    const error = ref(null)

    //access to collection in firebase
    let collectionRef = projectFirestore.collection(collection).orderBy('createdAt')
    // everytime there is a change in the documents the following method add each message to 'results' array
    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id})
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'Could not fetch data'
    })

    // to avoid setting multiple realtime listeners and making unneccesary requests
    watchEffect(onInvalidate => {
        //'watchEffect' takes automaticly a 'onInvalidate' function as parameter
        // the 'ChatWindow' component eventually will unmount when logged out and 'onInvalidate' will catch this event
        //subsequently it will unsubscribe from collection and will stop taking snapshots
        // this way the snapshots will not be stack on top of each other
        onInvalidate(() => unsub())

    })

    return { documents, error}
}

export default getCollection