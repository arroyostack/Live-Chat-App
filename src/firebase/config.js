//import firebase package to make it available on the project
//"compat" is added to allow finding paths in lastest versions of node js
import firebase from 'firebase/compat/app'

//will be use to conect project with database
import 'firebase/compat/firestore'
//firebase AUTH package. Will allow users to loging and access user data
import 'firebase/compat/auth'



const firebaseConfig = {
    apiKey: "AIzaSyABinpWZwAWxA6d9YzTtp1SoXHKmDbF5hY",
    authDomain: "live-chat-a6403.firebaseapp.com",
    projectId: "live-chat-a6403",
    storageBucket: "live-chat-a6403.appspot.com",
    messagingSenderId: "549789481731",
    appId: "1:549789481731:web:7c290b58f36050f4e50736"
  };


  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init AUTH
  const projectAuth = firebase.auth()

  //init firestore
  const projectFirestore = firebase.firestore() 

  //init timestamp/allows timestamp to be created by firestore
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, timestamp, projectAuth }