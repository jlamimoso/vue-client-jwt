import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://server-express-jwt.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 2500;

axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        //this.$store.state.processando
        if (error.response) {
            if (error.response.status == 401) {
                console.log('intercept response... ' + error);
                const originalRequest = error.config;
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    return axios
                        .post('token', { token: store.getters.StateRft })
                        .then(res => {
                            if (res.status == 201) {
                                return axios(originalRequest);
                            }
                        })
                        .catch(error => {
                            store.dispatch('LogOut');
                            router.push({ name: 'login' });
                            return Promise.reject(error);
                        });
                } else {
                    store.dispatch('LogOut');
                    router.push({ name: 'login' });
                    return Promise.reject(error);
                }
            } else {
                if (error.response.status == 400) {
                    store.dispatch('LogOut');
                    router.push({ name: 'login' });
                    return Promise.reject(error);
                } else {
                    router.push({ name: 'erro', params: { erro: error } });
                    return Promise.reject(error);
                }
            }
        } else {
            router.push({ name: 'erro', params: { erro: error } });
            return Promise.reject(error);
        }
    }
);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
