const routes = [
  {
    path: '/',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/profile',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/Profile.vue') }]
  },
  {
    path: '/product',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/Product.vue') }]
  },
  {
    path: '/service',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/Service.vue') }]
  },
  {
    path: '/case',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/Case.vue') }]
  },
  {
    path: '/about',
    meta: { auth: false },
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', component: () => import('pages/About.vue') }]
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
