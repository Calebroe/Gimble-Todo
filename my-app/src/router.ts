import { createRouter, createWebHistory} from 'vue-router';
import App from './App.vue'
import Base from './BaseView.vue'
import Login from './components/Login.vue'

const routes = [
  {
    path: "/",
    component: Base,
    children: [
      { path: "", redirect: { name: "login" } }, // Redirect to the 'dashboard' named route
      { path: "login", name: "login", component: Login}, // Corrected path (removed leading '/')
    ],
  },
  {
    /*path: "/app",
    component: App,
    children: [ 
      { path: "", redirect: { name: "home" } }, // Redirect to the 'dashboard' named route
      { path: '/home', component: Home, name: 'home' },
      { path: '/category/bestsellers', component: Bestsellers, name: 'bestsellers' },
      { path: '/category/new', component: New, name: 'new' },
      { path: '/category/ships', component: Ships, name: 'ships' },
      { path: '/category/cannons', component: Cannons, name: 'cannons' },
      { path: '/category/firearms', component: Firearms, name: 'firearms' },
      { path: '/category/swords', component: Swords, name: 'swords' },
      { path: '/category/clothes', component: ClothesVue, name: 'clothes' },
      { path: '/category/sale', component: Sale, name: 'sale' },
      // ... any other child routes 
    ], */
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
