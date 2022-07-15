import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import ChatRoom from '../views/ChatRoom.vue'
import MsgError from '../views/MsgError.vue'
import { projectAuth } from '../firebase/config'

//auth guard
//auth guard will protect the chat room from unsigned users

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(!user) {
    //if there is no user will be redirected to 'Welcome' view
    next({ name: 'Welcome' })
  } else {
    //if there is user will redirect to chatroom
    next() 
  }
  
}

//no-auth will redirected logged in users to 'ChatWindow'

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(user) {
    //if there is no user will be redirected to 'Welcome' view
    next({ name: 'ChatRoom' })
  } else {
    //if there is user will redirect to chatroom
    next() 
  }
}

const routes = [
  {
    //this will be the first screen that user view - loging- register
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth
  },
  {
    //after logging the user will be redirect to this page where chat is available
    path: '/chatroom',
    name: 'ChatRoom',
    component: ChatRoom,
    // 'beforeEnter' runs 'requireAuth' function before conecting to this route
    beforeEnter: requireAuth
  },
  ,
  {
    path: '/*',
    name: 'error',
    component: MsgError
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
