import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './routes/index';

import './assets/sass/main.scss'

Vue.config.productionTip = false;

import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'


// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

new Vue({
  el: '#app',
  store,
  router,
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
