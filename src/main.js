// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/app.styl'

import App from './App'
import router from './router'
import store from './store'
import BtnSubmit from './components/BtnSubmit'

Vue.config.productionTip = false
Vue.use(Element, {locale, size: 'small'})
Vue.component('BtnSubmit', BtnSubmit)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate () {
    this.$store.dispatch('initialize')
  }
})
