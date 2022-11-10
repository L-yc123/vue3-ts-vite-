import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { App } from "vue";
import store from "../store";
import layout from '../pages/layout.vue'
import notfound from '../pages/notfound/notfound.vue'
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../pages/home/home.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login.vue"),
  },
  {path:'/404',
    component:notfound
}
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token && store.state.menus.length === 0) {
    store.dispatch("getAdminInfo").then(() => {
      const menus = store.getters.getNewMenus;
      for (let i in menus) {
        const newRoute: RouteRecordRaw = {
          path: "/" + menus[i].name,
          name: menus[i].name,
          component: layout,
          redirect:`/${menus[i].name}/${menus[i].children[0].name}`,
          children: [],
        };
        menus[i].children.map((item: { name: any; })=>{
          newRoute.children?.push({
            path: item.name,
            name: item.name,
            component: () =>
              import(`../pages/${menus[i].name}/${item.name}.vue`),
          });
        })
        router.addRoute(newRoute);
        }
        next(to);
    });
  }else if(!token&&to.path!=='/login'){
    next('/login')
  }else{
    next();
  }
});

export const initRouter = (app: App<Element>) => {
  app.use(router);
};
