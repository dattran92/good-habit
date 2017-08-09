import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/Home';
import Objective from '@/containers/Objective';
import Chart from '@/containers/Chart';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/objective',
      name: 'Objective',
      component: Objective,
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart,
    },
  ],
});
