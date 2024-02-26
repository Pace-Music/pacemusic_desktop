import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import(/* webpackChunkName: "Main" */ '../views/Main.vue'),
    },   
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '../views/Error.vue'),
      meta: { notFound: true }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    },
  ]
})

// Example of using a navigation guard to update the document title
router.beforeEach((to, from, next) => {
  document.title = 'Pace Music - ' + to.name;
  next();
});

export default router
