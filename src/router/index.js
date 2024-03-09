import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import(/* webpackChunkName: "Main" */ '../views/Main.vue'),
    },   
    {
      path: '/review',
      name: 'Обзор',
      component: () => import(/* webpackChunkName: "Review" */ '../views/Review.vue'),
    },   
    {
      path: '/favorite',
      name: 'Медиатека',
      component: () => import(/* webpackChunkName: "Favorite" */ '../views/Favorite.vue'),
    }, 
    {
      path: '/search',
      name: 'Поиск',
      component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue'),
    }, 
    {
      path: '/settings',
      name: 'Параметры настройки',
      component: () => import(/* webpackChunkName: "Setting" */ '../views/Settings.vue'),
    }, 
    {
      path: '/error',
      name: 'Error',
      component: () => import(/* webpackChunkName: "404" */ '../views/Error.vue'),
      meta: { notFound: true }
    },

    {
      path: '/users/:id',
      name: '',
      component: () => import(/* webpackChunkName: "User" */ '../views/User.vue'),
    }, 
    // {
    //   path: '/playlists/:id',
    //   name: '',
    //   component: () => import(/* webpackChunkName: "Playlist" */ '../views/Playlist.vue'),
    // }, 
    // {
    //   path: '/albums/:id',
    //   name: '',
    //   component: () => import(/* webpackChunkName: "Album" */ '../views/Album.vue'),
    // },

    {
      path: '/:catchAll(.*)',
      redirect: '/error'
    },
  ]
})

// Example of using a navigation guard to update the document title
router.beforeEach((to, from, next) => {
  document.title = (to.name == '') ? 'Pace Music' : 'Pace Music - ' + to.name;
  next();
});

export default router
