// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router

import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ContactManager from "../views/ContactManager.vue";
import AddContact from "../views/AddContact.vue";
import EditContact from "../views/EditContact.vue";
import ViewContact from "../views/ViewContact.vue";
import PageNotFound from "../views/PageNotFound.vue";

// import VuexCounter from "@/components/vuex/VuexCounter";
// import VuexEmployees from "@/components/vuex/VuexEmployees";
// import VuexUserList from "@/components/vuex/VuexUserList";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/contacts",
    component: Home,
  },
  {
    path: "/contacts",
    name: "ContactManager",
    component: ContactManager,
  },
  {
    path: "/contacts/add",
    name: "AddContact",
    component: AddContact,
  },
  {
    path: "/contacts/edit/:contactId",
    name: "EditContact",
    component: EditContact,
  },
  {
    path: "/contacts/view/:contactId",
    name: "ViewContact",
    component: ViewContact,
  },
  {
    path: "/:pathMatch(.*)",
    name: "PageNotFound",
    component: PageNotFound,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
