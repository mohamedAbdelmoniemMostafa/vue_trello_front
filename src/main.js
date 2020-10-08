import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'


window.axios = axios;
Vue.config.productionTip = false
Vue.use(Vuetify)

window.Event = new Vue;
window._token = localStorage.getItem('_token');
window.base_url = 'http://localhost:8000/';

const opts = {
    icons: {
        iconFont: 'mdi'
    }
}

const vuetify = new Vuetify(opts)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    vuetify,
    render: h => h(App)
})
