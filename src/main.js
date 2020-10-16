import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './routes/index';
import Buefy from 'buefy'

import 'buefy/dist/buefy.css'

import './assets/sass/main.scss'

Vue.use(Buefy)
Vue.config.productionTip = false;

import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'

import VueSplit from 'vue-split-panel'
Vue.use(VueSplit)


// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
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
