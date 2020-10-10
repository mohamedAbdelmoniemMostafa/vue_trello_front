import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

window.axios = axios;
Vue.config.productionTip = false
Vue.use(Vuetify)

window.Event = new Vue;
window._token = localStorage.getItem('_token');
window.base_url = 'http://localhost:8000/';

const opts = {
    icons: {
        iconfont: 'mdi'
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
