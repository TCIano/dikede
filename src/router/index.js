import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "111",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "帝可得", icon: "shouye" },
      },
    ],
  },
  {
    path: "/task",
    component: Layout,
    name: "task",
    meta: { title: "工单管理", icon: "renwu" },
    children: [
      {
        path: "business",
        component: () => import("@/views/task"),
        meta: { title: "运营工单" },
      },
      {
        path: "operation",
        component: () => import("@/views/task"),
        meta: { title: "运维护工单" },
      },
    ],
  },
  {
    path: "/node",
    component: Layout,
    name: "node",
    meta: { title: "点位管理", icon: "dianwei" },
    children: [
      {
        path: "region",
        component: () => import("@/views/node"),
        meta: { title: "区域管理" },
      },
      {
        path: "node",
        component: () => import("@/views/node"),
        meta: { title: "点位管理" },
      },
      {
        path: "partner",
        component: () => import("@/views/node"),
        meta: { title: "合作商管理" },
      },
    ],
  },
  {
    component: Layout,
    path: "/device",
    name: "device",
    meta: { title: "设备管理", icon: "icon" },
    children: [
      {
        path: "index",
        component: () => import("@/views/device"),

        meta: { title: "设备管理" },
      },
      {
        path: "status",
        component: () => import("@/views/device"),

        meta: { title: "设备状态" },
      },
      {
        path: "type",
        component: () => import("@/views/device"),

        meta: { title: "设备类型管理" },
      },
    ],
  },
  {
    path: "/human",
    component: Layout,
    name: "human",
    meta: { title: "人员管理", icon: "renyuan" },
    children: [
      {
        path: "index",
        component: () => import("@/views/human"),

        meta: { title: "人员列表" },
      },
      {
        path: "statistic",
        component: () => import("@/views/human"),

        meta: { title: "人效统计" },
      },
      {
        path: "work",
        component: () => import("@/views/human"),

        meta: { title: "工作量列表" },
      },
    ],
  },
  {
    path: "/product",
    component: Layout,
    name: "product",
    meta: { title: "商品管理", icon: "shangpin" },
    children: [
      {
        path: "ptype",
        component: () => import("@/views/product"),

        meta: { title: "商品类型" },
      },
      {
        path: "manage",
        component: () => import("@/views/product"),

        meta: { title: "商品管理" },
      },
    ],
  },
  {
    path: "/policy",
    component: Layout,
    name: "policy",
    children: [
      {
        path: "index",
        component: () => import("@/views/policy"),
        meta: { title: "策略管理", icon: "celve" },
      },
    ],
  },
  {
    path: "/order",
    component: Layout,
    name: "order",
    children: [
      {
        path: "index",
        component: () => import("@/views/order"),
        meta: { title: "订单管理", icon: "dingdan" },
      },
    ],
  },
  {
    path: "/bill",
    component: Layout,
    redirect: "/bill/index",
    name: "bill",
    children: [
      {
        path: "index",
        component: () => import("@/views/bill"),
        meta: { title: "对账管理", icon: "zhangdan" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
