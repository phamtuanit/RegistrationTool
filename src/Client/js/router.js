import Helper from "./utility/component-helper.js";
export default {
    router: new VueRouter({
        routes: [
            { path: '/', component: Helper.loadComponent('configuration.js') },
            { path: '/registration', component: Helper.loadComponent('registration.js') },
            { path: '/registrationadmin', component: Helper.loadComponent('registrationcollector.js') },
        ]
    })
}