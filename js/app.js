import Router from './router.js';
import Helper from "./utility/component-helper.js";

var appvm = new Vue({
    router: Router.router,
    el: "#app",
    data() {
        return {
            isLoggedIn: false,
            userInfo: "",
        };
    },
    components: {
        "signing": Helper.loadComponent('assignment.js'),
    },
    created() {
        console.log("Vue-App initialized: " + this.$data.title);
    },
    methods: {
        storeUserInfo: function(userInfo) {
            this.isLoggedIn = true;
            this.userInfo = userInfo;
            console.log("User information has been stored.", userInfo);
        },
        logout: function() {
            this.isLoggedIn = false;
            this.userInfo = {};
            console.log("User information has been logged out.");
        }
    },
});

window.Application = {
    VueApp: appvm,
    Router: Router
};