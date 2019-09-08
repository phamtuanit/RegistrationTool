import Router from './router.js';
import Helper from "./utility/component-helper.js";

// Configure  application
const appConfig = {
    baseUrl: window.location.href,
    set host(hostName) {
        axios.defaults.baseURL = hostName;
    },
    get host() {
        return axios.defaults.baseURL;
    },
    loadConfig: function loadConfig() {
        const lastSlash = window.location.href.lastIndexOf('/');
        if (lastSlash > window.location.origin.length) {
            this.baseUrl = window.location.href.slice(0, lastSlash);
        }

        const ssConfig = URLHelper.urlToData(window.location.href);
        this.host = ssConfig.host;
        this["userConfig"] = ssConfig;
    },
}

window.Application = {
    Router: Router,
    Config: appConfig
};

var appvm = new Vue({
    router: Router.router,
    el: "#app",
    data() {
        return {
            hasLoginPanel: true,
            isLoggedIn: false,
            userInfo: {},
        };
    },
    components: {
        "signing": Helper.loadComponent('assignment.js'),
    },
    created() {
        console.log("Vue-App initialized: " + this.$data.title);
        window.Application.Config.loadConfig();
        this.hideLoginPanel();
    },
    methods: {
        hideLoginPanel: function hideLoginPanel() {
            const urlParam = URLHelper.getUrlParams(window.location.href);
            if (urlParam && urlParam.hideLoginPanel == 'true') {
                this.hasLoginPanel = false;
                this.checklogin();
            }
        },
        checklogin: function checkLogin() {
            const userStr = window.localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                if (user && user.email && user.id) {
                    console.info("The user has logged in already.");
                    this.isLoggedIn = true;
                    this.userInfo = user;
                }
            }
        },
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

window.Application["VueApp"] = appvm;