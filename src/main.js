import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'
// Plugins
import GlobalComponents from './gloablComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
// router setup
import routes from './routes/routes'
// library imports
import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'
import sidebarLinks from './sidebarLinks'
// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(VeeValidate)
locale.use(lang)

/*******************************************************/
import helper from './plugins/helper'
Vue.mixin(helper);

import vueHeadful from 'vue-headful';
Vue.component('vue-headful', vueHeadful);

import {store} from './store/store'

/*******************************************************/

const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})


new Vue({
   store:store,
  el: '#app',
  render: h => h(App),
  router
})

