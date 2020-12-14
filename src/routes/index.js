import Vue from 'vue'
import VueRouter, {Location, Route, RouteConfig} from 'vue-router'
import LandingPage from "@/pages/LandingPage.vue"
import SearchPage from "@/pages/SearchPage.vue"
import DocumentPage from "@/pages/DocumentPage.vue"
import AddDocumentPage from "@/pages/AddDocumentPage.vue"
import DocumentationPage from "@/pages/DocumentationPage.vue"

import DocumentEditionPage from "@/pages/DocumentEditionPage.vue"
import LoginPage from "@/pages/LoginPage.vue"
import ErrorPage from "@/pages/ErrorPage.vue"

/*
import RegisterPage from "@/pages/RegisterPage.vue"
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
      path: '/documents/add',
      component: AddDocumentPage,
      name: 'document-add'
    },
    {
      path: '/documents/:docId/view/',
      redirect:  '/documents/:docId/notice'
    },
    {
      path: '/documents/:docId/view/:section',
      component: DocumentPage,
      name: 'document-view',
      props: true
    },
    {
      path: '/documents/:docId/edit/:section',
      component: DocumentEditionPage,
      name: 'document-edition',
      props: true
    },
    {
      path: '/documentation/:section',
      component: DocumentationPage,
      name: 'documentation',
      props: true
    },
    {
      path: '/login',
      component: LoginPage,
      name: 'login'
    },
    {
      path: '/error',
      component: ErrorPage,
      name: 'error',
      props: true
    }
  ]
})


export default router;