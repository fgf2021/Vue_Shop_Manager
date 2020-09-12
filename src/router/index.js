import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    {path:'/',redirect:'/login'},
    { path: '/login', component: Login }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path === '/login') return next();
  const tokenstr = window.sessionStorage.getItem('token');
  if(!tokenstr) return next('/login');
  next();
})

export default router
