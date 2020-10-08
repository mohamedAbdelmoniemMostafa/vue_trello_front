import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LogIn from '@/components/LogIn'
import Register from '@/components/Register'
import Boards from '@/components/Boards'
import SingleBoard from '@/components/SingleBoard'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        name: 'Boards',
        component: Boards
      },
      {
          path: '/boards/:board_id',
          name: 'SingleBoard',
          component: SingleBoard
      },
      {
          path: '/login',
          name: 'LogIn',
          component: LogIn
      },
      {
          path: '/register',
          name: 'Register',
          component: Register
      }
  ],
    mode:'history'
})
