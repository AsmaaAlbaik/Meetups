import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Meetups from '../components/Meetups/Meetups.vue'
import Meetup from '../components/Meetups/Meetup.vue'
import CreateMeetups from '../components/Meetups/CreateMeetup.vue'
import Profile from '../components/User/Profile.vue'
import Signup from '../components/User/Signup.vue'
import Signin from '../components/User/Signin.vue'
import auth from '../router/auth'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetups',
    component: CreateMeetups
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    component: Meetup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    // beforeEnter: auth
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    // beforeEnter: auth
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
