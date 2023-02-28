import { createRouter, createWebHistory } from "vue-router";
import TestsFemale from './conteiners/TestsFemale/'
import WelcomeApp from "./conteiners/WelcomeApp/";
import ResultTest from "./conteiners/ResultTest/";
import QuasiTest from "./conteiners/QuasiTest/";
import AboutProject from "./conteiners/AboutProject/"
import ContactsDeveloper from "./conteiners/ContactsDeveloper/"

export default createRouter({
    history:createWebHistory(),
    routes:[
        {path: '/test', component: TestsFemale},
        {path: '/main', component: WelcomeApp, alias:'/'},
        {path: '/mtest', component: QuasiTest},
        {path: '/result', component: ResultTest},
        {path: '/about', component: AboutProject},
        {path: '/contact', component: ContactsDeveloper}

    ]
})