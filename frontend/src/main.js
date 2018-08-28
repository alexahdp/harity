// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
// TODO избавиться
import './assets/bootstrap4.min.css';
import App from './App';
import router from './router';
import store from './store';

Vue.use(Element, { locale });
Vue.config.productionTip = false;

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
