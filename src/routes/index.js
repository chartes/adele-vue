import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from "@/pages/LandingPage.vue"
import SearchPage from "@/pages/SearchPage.vue"
import DocumentPage from "@/pages/DocumentPage.vue"
import DocumentationPage from "@/pages/DocumentationPage.vue"

import DocumentEditionPage from "@/pages/DocumentEditionPage.vue"
import LoginPage from "@/pages/LoginPage.vue"
import ErrorPage from "@/pages/ErrorPage.vue"

import UserDashboardPage from "@/pages/UserDashboardPage.vue"
import UserProfilePage from "@/pages/UserProfilePage.vue"

import WorkInProgress from "@/pages/WorkInProgressPage.vue"

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
      path: '/profile',
      component: UserProfilePage,
      name: 'user-profile'
    },
    {
      path: '/dashboard/:section',
      component: UserDashboardPage,
      name: 'user-dashboard',
      props: true
    },
    {
      path: '/documents/:docId/view/',
      redirect:  '/documents/:docId/notice',
      props: true
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
    },
    {
      path: '/wip',
      component: WorkInProgress,
      name: 'wip'
    }
  ]
})


export default router;