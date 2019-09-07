import Helper from "./utility/component-helper.js";
export default {
    router: new VueRouter({
        mode: 'history',
        routes: [
            { path: '/survey', component: Helper.loadComponent('survey.js') },
            { path: '/registration', component: Helper.loadComponent('registration.js') },
            { path: '/', component: Helper.loadComponent('configuration.js') },
        ]
    })
}