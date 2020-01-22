const routes = [
  {
    path: '/guest',
    name: 'guest',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/auth/Login.vue') }]
  },
  {
    path: '/user',
    name: '',
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
