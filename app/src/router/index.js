import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/goods',
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: () => import(/*webpackChunkName: "goods"*/'../views/Goods'),
        children:[
          {
            path: ':id',
            name: 'goods-detail',
            component: () => import(/*webpackChunkName: "goods"*/'../views/GoodsDetail'),
          }
        ]
      },
      {
        path: 'category',
        name: 'category',
        component: () => import(/*webpackChunkName: "category"*/'../views/Category'),
        children:[
          {
            path: ':id',
            name: 'category-goods-detail',
            component: () => import(/*webpackChunkName: "goods"*/'../views/GoodsDetail'),
          }
        ]
      },
      {
        path: 'shopcart',
        name: 'shopcart',
        component: () => import(/*webpackChunkName: "shopcart"*/'../views/Shopcart'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import(/*webpackChunkName: "my"*/'../views/My'),
        
      },
      {
        path: 'auth',
        name: 'auth',
        redirect: "/auth/login",
        component: () => import(/*webpackChunkName: "my"*/"../views/auth/Auth"),
        children:[
          {
            path: 'login',
            name:'login',
            component: () => import(/*webpackChunkName: "my"*/"../views/auth/Login"),
          },
          {
            path: 'register',
            name:'register',
            component: () => import(/*webpackChunkName: "my"*/"../views/auth/Register"),
          }

        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
