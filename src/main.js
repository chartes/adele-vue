import Vue from 'vue';
import App from './App.vue';
import store from './store';
//import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from './routes/index';

import './assets/sass/main.scss'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  //vuetify,
  created () {
    const userString = localStorage.getItem('user') // grab user data from local storage

    if (userString) { // check to see if there is indeed a user
      let userData = JSON.parse(userString) // parse user data into JSON
      this.$store.commit('user/SET_USER_DATA', userData) // restore user data with Vuex
    }
  },
  render(h) {
    return h(App, {})
  }
});
