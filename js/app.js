import Router from './router.js';

var appvm = new Vue({
  router: Router.router,
  el: "#app",
  data() {
    return {
      title: "Phạm Tuân's Blog",
    };
  },
  components: {  },
  created() {
    console.log("Vue-App initialized: " + this.$data.title);
  }
});

window.Application = {
  VueApp: appvm,
  Router: Router
};
