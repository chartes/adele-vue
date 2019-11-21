import Vue from 'vue'
import VueRouter, {Location, Route, RouteConfig} from 'vue-router'
import LandingPage from "@/pages/LandingPage.vue"
import SearchPage from "@/pages/SearchPage.vue"
import DocumentPage from "@/pages/DocumentPage.vue"
import DocumentEditionPage from "@/pages/DocumentEditionPage.vue"
import LoginPage from "@/pages/LoginPage.vue"

/*
import LoginPage from "@/pages/LoginPage.vue"
import RegisterPage from "@/pages/RegisterPage.vue"
import DocumentPage from "@/pages/DocumentPage.vue"
*/

Vue.use(VueRouter)

const rootUrl = `${process.env.VUE_APP_APP_ROOT_URL}`

const router = new VueRouter({
  base: rootUrl,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LandingPage,
      name: 'home'
    },
    {
      path: '/documents',
      component: SearchPage,
      name: 'search'
    },
    {
      path: '/documents/view/:docId',
      redirect:  '/documents/:docId/notice'
    },
    {
      path: '/documents/view/:docId/:section',
      component: DocumentPage,
      name: 'document-view',
      props: true
    },
    {
      path: '/documents/edit/:docId/:section',
      component: DocumentEditionPage,
      name: 'document-edition',
      props: true
    },
    {
      path: '/login',
      component: LoginPage,
      name: 'login'
    }
  ]
})


export default router;