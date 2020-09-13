import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    {path:'/',redirect:'/login'},
    { path: '/login', component: Login },
    {path:'/home',component:Home,redirect:'/welcome',children:[
      {path:'/welcome',component:Welcome}
    ]}
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path === '/login') return next();
  const tokenstr = window.sessionStorage.getItem('token');
  if(!tokenstr) return next('/login');
  next();
})

export default router
