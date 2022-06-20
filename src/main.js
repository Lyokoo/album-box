import App from "./App";
import Vue from "vue";
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false;

wx.cloud.init({
  env: 'cloud1-8gh3wy18e63b83e7',
  traceUser: true,
})

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
