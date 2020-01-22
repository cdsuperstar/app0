import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Vue.axios.defaults.baseURL = process.env.BASE_URL
  Vue.router = Router
  Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/laravel-passport-bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'role',
    // authRedirect: { path: '/user' },
    // forbiddenRedirect: { path: '/403' },
    // notFoundRedirect: { path: '/404' },
    // registerData: {
    //   url: 'auth/register',
    //   method: 'POST',
    //   redirect: 'auth//login'
    // },
    loginData: {
      url: 'oauth/token',
      method: 'POST',
      redirect: 'dashboard',
      fetchUser: true,
      data: { grant_type: 'password' }
    },
    logoutData: {
      url: 'auth/logout',
      method: 'POST',
      redirect: '/guest',
      makeRequest: false
    },
    // fetchData: { url: 'auth/user', method: 'GET', enabled: false },
    refreshData: {
      url: 'oauth/token',
      method: 'POST',
      enabled: true,
      interval: 30,
      checkExpiration: true,
      data: { grant_type: 'refresh_token' }
    },
    fetchData: {
      url: 'auth/user',
      method: 'GET',
      enabled: true
    },
    passportData: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
  })
  // Vue.axios.defaults.headers.common = {
  //   // 'X-CSRF-TOKEN': window.Laravel.csrfToken,
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'Content-Type': 'application/json'
  // }
  Router.beforeEach((to, from, next) => {
    console.log('TODO:add before each router')

    next()
    // if () next('login')
    // else if (!requiresAuth && currentUser) next('home')
    // else next()
  })
  return Router
}
