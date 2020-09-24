import Vue from 'vue'
const Login = () =>import(/*webpackChunkName:"login_home_welcome"*/ '../components/Login.vue')
const Home = () =>import(/*webpackChunkName:"login_home_welcome"*/ '../components/Home.vue')
const Welcome = () =>import(/*webpackChunkName:"login_home_welcome"*/ '../components/Welcome.vue')

const Users = () =>import(/*webpackChunkName:"users_rights_roles"*/ '../components/user/Users.vue')
const Rights = () =>import(/*webpackChunkName:"users_rights_roles"*/ '../components/power/Rights.vue')
const Roles = () =>import(/*webpackChunkName:"users_rights_roles"*/ '../components/power/Roles.vue')

const Cate = () =>import(/*webpackChunkName:"cate_params"*/ '../components/goods/Cate.vue')
const Params = () =>import(/*webpackChunkName:"cate_params"*/ '../components/goods/Params.vue')

const List = () =>import(/*webpackChunkName:"list_add"*/ '../components/goods/List.vue')
const Add = () =>import(/*webpackChunkName:"list_add"*/ '../components/goods/Add.vue')

const Order = () =>import(/*webpackChunkName:"order_report"*/ '../components/order/Order.vue')
const Report = () =>import(/*webpackChunkName:"order_report"*/ '../components/report/Report.vue')

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    {path:'/',redirect:'/login'},
    { path: '/login', component: Login },
    {path:'/home',component:Home,redirect:'/welcome',children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:Users},
      {path:'/rights',component:Rights},
      {path:'/roles',component:Roles},
      {path:'/categories',component:Cate},
      {path:'/params',component:Params},
      {path:'/goods',component:List},
      {path:'/goods/add',component:Add},
      {path:'/orders',component:Order},
      {path:'/reports',component:Report}
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
