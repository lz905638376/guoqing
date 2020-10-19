export default {
  path: "/",
  component: () => import("../layout/Index"),
  children: [
    // 系统首页
    {
      path: "",
      name: "home",
      component: () => import("../views/home/Home"),
      meta: {
        //路由的数据
        icon: "home",
        title: "系统首页",
      },
    },
    // 商品管理
    {
      path: "goods-manage",
      name: "goods-manage",
      component: () => import("../views/goods/Manage"),
      children:[
        
      ],
      meta: {
        title: "商品管理",
      },
    },
    // 订单管理
    {
      path: "order-manage",
      name: "order-manage",
      component: {
        //直接提供组件的render函数，不需要vue文件了。
        render: (h) => <router-view />,
      },
      redirect: "/order-manage/goods-order",
      meta: {
        title: "订单管理",
      },
      children: [
        // 商品订单
        {
          path: "goods-order",
          name: "goods-order",
          component: () => import("../views/order/GoodsOrder"),
          meta: {
            title: "商品订单",
          },
        },
        // 售后管理
        {
          path: "after-sale",
          name: "after-sale",
          component: () => import("../views/order/AfterSale"),
          meta: {
            title: "售后管理",
          },
        },
      ],
    },
    // 评价管理
    {
      path: "comment-manage",
      name: "comment-manage",
      component: () => import("../views/comment/Manage"),
      meta: {
        title: "评价管理",
      },
    },
    // 活动管理
    {
      path: "activity-manage",
      name: "activity-manage",
      component: () => import("../views/activity/Manage"),
      meta: {
        title: "活动管理",
      },
    },
    // 平台管理
    {
      path: "platform-manage",
      name: "platform-manage",
      component: {
        //直接提供组件的render函数，不需要vue文件了。
        render: (h) => <router-view />,
      },
      redirect: "/platform-manage/category-setting",
      meta: {
        title: "平台管理",
      },
      children: [
        // 分类设置
        {
          path: "category-setting",
          name: "category-setting",
          component: () => import("../views/platform/CategorySetting"),
          meta: {
            title: "分类设置",
          },
        },
        // 焦点图
        {
          path: "focus-map",
          name: "focus-map",
          component: () => import("../views/platform/FocusMap"),
          meta: {
            title: "焦点图",
          },
        },
        // 运费模版
        {
          path: "freight-template",
          name: "freight-template",
          component: () => import("../views/platform/FreightTemplate"),
          meta: {
            title: "运费模版",
          },
        },
      ],
    },
    // 会员管理
    {
      path: "vip-manage",
      name: "vip-manage",
      component: () => import("../views/vip/Manage"),
      meta: {
        title: "会员管理",
      },
    },
    // 数据统计
    {
      path: "data-statistics",
      name: "data-statistics",
      component: () => import("../views/data/Statistics"),
      meta: {
        title: "数据统计",
      },
    },
    // 权限管理
    {
      path: "rights-manage",
      name: "rights-manage",
      component: () => import("../views/rights/Manage"),
      meta: {
        title: "权限管理",
      }
    },
    {
      path: "add-acount",
      name: "add-acount",
      component: () => import("../views/rights/AddAcount"),
      meta: {
        title: "添加账号",
      }
    },
  ],
};
