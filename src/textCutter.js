import Vue from 'vue';
import TextCutter from '@/components/editors/TextCutterEditor.vue'
import './assets/sass/main.scss'


const Components = {
    TextCutter
}

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])
});

export default Components;