import Helper from "./utility/component-helper.js";
export default {
    router: new VueRouter({
        routes: [
            { path: '/registration', component: Helper.loadComponent('registration.js') },
            { path: '/', component: Helper.loadComponent('configuration.js') },
        ]
    })
}