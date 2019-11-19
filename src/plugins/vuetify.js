import Vue from 'vue'
import Vuetify from 'vuetify/lib'
//import 'vuetify/src/stylus/app.styl'
//import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify);

const VueInputMask = require('vue-inputmask').default;
Vue.use(VueInputMask);

export default new Vuetify({
  iconfont: 'md',
  icons: {
    // pagination
    'firststep': 'fas fa-step-backward',
    'laststep': 'fas fa-step-forward',
    'nextstep': 'fas fa-chevron-right',
    'previousstep': 'fas fa-chevron-left',

    //tag bar
    'active_check_circle': 'fas fa-check-circle',
    'inactive_check_circle': 'far fa-check-circle',

    'active_bookmark': 'fas fa-bookmark',
    'inactive_bookmark': 'far fa-bookmark',

    'lock': 'fas fa-lock',
    'unlock': 'fas fa-unlock',

    'show': 'fas fa-eye',
    'hide': 'fas fa-eye-slash',
  }
})