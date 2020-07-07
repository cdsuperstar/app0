const routes = [
  {
    path: '/',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/webindex.vue') }]
  },
  {
    path: '/login',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/Login.vue') }]
  },
  {
    path: '/product',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/web0/product.vue') }]
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
