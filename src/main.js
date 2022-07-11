import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { projectAuth } from './firebase/config'

//'projectAuth.onAuthStateChanged' will fire a function everytime there is a change. If there is no app the app will be created. This allows time for authentification and user will have a value if logged in at the time the app is created
let app
projectAuth.onAuthStateChanged(() => {
    if(!app) {
        app = createApp(App)
        .use(router)
        .mount('#app')
    }
})

