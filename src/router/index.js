import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/modules/login/router'
import registerRoutes from '@/modules/cadastro/router'
import dashboardRoutes from '@/modules/dashboard/router'

const routes = [
  ...authRoutes,
  ...registerRoutes,
  ...dashboardRoutes,
  { path: '', redirect: '/login' },
  { path: '/:catchAll(.*)', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiredAuth)) {
    const token = window.localStorage.getItem('AUTH_TOKEN')

    const loginRoute = {
      path: '/login',
      query: { redirect: to.fullPath }
    }

    if (token) {
      try {
        return next()
      } catch(e) {
        return next(loginRoute)
      }
    }

    return next(loginRoute)
  }

  next();
});

export default router
