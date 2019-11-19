import Vue from 'vue'
import VueRouter, {Location, Route, RouteConfig} from 'vue-router'
import LandingPage from "@/pages/LandingPage.vue"
/*
import LoginPage from "@/pages/LoginPage.vue"
import RegisterPage from "@/pages/RegisterPage.vue"
import DocumentPage from "@/pages/DocumentPage.vue"
*/

Vue.use(VueRouter)

const rootUrl = `${process.env.VUE_APP_APP_ROOT_URL}`

export default new VueRouter({
  base: rootUrl,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LandingPage,
      name: 'landing'
    },
     /*
    {
      path: '/register',
      component: RegisterPage,
      name: 'register'
    },
    {
      path: '/login',
      component: LoginPage,
      name: 'login'
    },
   
    {
      path: '/documents/:docId',
      component: DocumentPage,
      name: 'document',
      props: true
    },
    */
  ]
})
