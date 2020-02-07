const routes = [
  {
    path: '/',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/Login.vue') }]
  },
  {
    path: '/login',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/Login.vue') }]
  },
  {
    path: '/register',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/Register.vue') }]
  },
  {
    path: '/forgot',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/password/Forgot.vue') }
    ]
  },
  {
    path: '/reset',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/password/Reset.vue') }
    ]
  },
  {
    path: '/user',
    meta: { auth: true },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'changepwd',
        name: 'changepwd',
        component: () => import('pages/person/changepwd.vue')
      },
      {
        path: 'userprofile',
        name: 'userprofile',
        component: () => import('pages/person/userprofile.vue')
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('pages/person/message.vue')
      },
      {
        path: 'notepad',
        name: 'notepad',
        component: () => import('pages/person/notepad.vue')
      },
      {
        path: 'help',
        name: 'help',
        component: () => import('pages/person/help.vue')
      }
    ]
  }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    name: 'not-found',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
