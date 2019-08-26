import Helper from "./utility/component-helper.js";
export default {
  router: new VueRouter({
    routes: [
      { path: '/survey', component: Helper.loadComponent('survey.js') },
    ]
  })
}
