import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const rootUrl = `${process.env.VUE_APP_APP_ROOT_URL}`

const SearchPage = () => import(/* webpackChunkName: "group-view" */ '@/pages/SearchPage.vue')
const LandingPage = () => import(/* webpackChunkName: "group-view" */ '@/pages/LandingPage.vue')
const DocumentPage = () => import(/* webpackChunkName: "group-view" */ '@/pages/DocumentPage.vue')

const DocumentEditionPage = () => import(/* webpackChunkName: "group-edit" */ '@/pages/DocumentEditionPage.vue')
const LoginPage = () => import(/* webpackChunkName: "group-edit" */ '@/pages/LoginPage.vue')
const UserDashboardPage = () => import(/* webpackChunkName: "group-edit" */ '@/pages/UserDashboardPage.vue')
const ErrorPage = () => import(/* webpackChunkName: "group-edit" */ '@/pages/ErrorPage.vue')
const UserProfilePage = () => import(/* webpackChunkName: "group-edit" */ '@/pages/UserProfilePage.vue')
const DocumentationPage = () => import(/* webpackChunkName: "group-edit" */ '@/pages/DocumentationPage.vue')


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
    /*
    {
      path: '/wip',
      component: WorkInProgress,
      name: 'wip'
    }
    */
  ]
})


export default router;