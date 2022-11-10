// import { RouteRecordRaw } from "vue-router";
import { pa } from "element-plus/es/locale";
import { createStore } from "vuex";
import { getData } from "../http/api";

interface MenuObj {
  parentId: number;
  id: number;
  children?: MenuObj[];
}
interface State {
  menus: MenuObj[];
}
interface newMenus {
  [key: number]: MenuObj;
}
const store = createStore<State>({
  state() {
    return {
      menus: [],
    };
  },
  getters: {
    getNewMenus(state) {
      const newMenus: newMenus = {};
      const menus = state.menus;
      for (let i = 0; i < menus.length; i++) {
          if (menus[i].parentId === 0) {
            newMenus[menus[i].id] = { ...menus[i],children:newMenus[menus[i].id]?.children||[] };
          } else {
            let parentId = menus[i].parentId
            newMenus[parentId]=newMenus[parentId]||{}
            newMenus[parentId].children=newMenus[parentId].children||[]
            newMenus[parentId].children?.push(menus[i])
            // newMenus[menus[i].parentId].children = newMenus[menus[i].parentId].children||[];
            // newMenus[menus[i].parentId].children?.push({ ...menus[i] })
          }
      }
      return newMenus;
    },
  },
  mutations: {
    updateMenus(state, menus) {
      state.menus = menus;
    },
  },
  actions: {
    getAdminInfo({commit}) {
      const newmenus = [
        {
          name: "user",
          title: "用户管理",
          id:1,
          parentId:0,
        },
        {
          name: "userList",
          id:11,
          parentId:1,
          //component:() => import("../pages/user/userList.vue"),
          title: "用户列表",
        },
        {
          name: "category",
          title: "分类管理",
          parentId:0,
          id:2,
        },
        {
          name: "categoryList",
          id:21,
          parentId:2,
          //component:() => import("../pages/category/categoryList.vue"),
          title: "分类列表",
        },
        {
          name: "addCategory",
          id:22,
          parentId:2,
          //component:() => import("../pages/category/addCategory.vue"),
          title: "添加分类",
        },
        {
          name: "goods",
          id:3,
          title: "商品管理",
          parentId:0,
        },
        {
          name: "goodsList",
          id:31,
          parentId:3,
          //component:() => import("../pages/goods/goodsList.vue"),
          title: "商品列表",
        },
        {
          name: "addGoods",
          id:32,
          parentId:3,
          //component:() => import("../pages/goods/addGoods.vue"),
          title: "添加商品",
        },
        {
          name: "appraise",
          title: "评价管理",
          id:4,
          parentId:0,
        },
        {
          name: "appraiseList",
          id:41,
          parentId:4,
          //component:() => import("../pages/appraise/appraiseList.vue"),
          title: "评价列表",
        },
        {
          name: "order",
          title: "订单管理",
          id:5,
          parentId:0,
        },
        {
          name: "orderList",
          id:51,
          parentId:5,
          //component:() => import("../pages/order/orderList.vue"),
          title: "订单列表",
        },
        {
          name: "carousel",
          id:6,
          title: "轮播管理",
          parentId:0,
        },
        {   
          id:61,
          parentId:6,
          name: "carouselList",
          //component:() => import("../pages/carousel/carouselList.vue"),
          title: "轮播列表",
        },
        {
          id:62,
          parentId:6,
          name: "addCarousel",
          // component:()=>('../pages/carousel/addCarousel.vue'),
          title: "添加轮播",
        },
        {
          name: "menus",
          id:7,
          title: "菜单管理",
          parentId:0,
        },
        {
           parentId:7,   
          id:71,
          name: "menusList",
          //component:() => import("../pages/menus/menusList.vue"),
          title: "菜单列表",
        },
        {
          id:72,
          parentId:7,
          name: "addMenus",
          // component:()=>('../pages/menus/addMenus.vue'),
          title: "添加菜单",
        }]
      return new Promise((resolve, reject) => {
        getData()
          .then((res) => {
            commit("updateMenus", newmenus);
            resolve(newmenus);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});

export default store;
