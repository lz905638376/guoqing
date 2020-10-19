<template>
  <a-menu
    theme="light"
    mode="inline"
    @click="changeRouteAction"
    :defaultSelectedKeys="[selectKey]"
    :defaultOpenKeys="openKeys"
  >
    <template v-for="item in menuData">
      <!-- 二级目录 -->
      <a-sub-menu
        v-if="item.children && item.children.length > 0"
        :key="item.name"
      >
        <span slot="title">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </span>
        <a-menu-item v-for="subItem in item.children" :key="subItem.name">
          <span>{{ subItem.meta.title }}</span>
        </a-menu-item>
      </a-sub-menu>
      <!-- 一级目录 -->
      <a-menu-item v-else-if="item.name !== 'rights-manage'" :key="item.name">
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
    </template>

    <a-menu-item v-if="userInfo.isAdmin" key="rights-manage">
      <a-icon type="user" />
      <span>权限管理</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { Menu, Icon } from "ant-design-vue";
import mainRoute from "../router/mainRoute";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    [Icon.name]: Icon,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
  },
  data() {
    return {
      selectKey: this.$route.name,
    };
  },
  computed: {
    openKeys() {
      const index = this.$route.matched.findIndex(
        (item) => item.name === this.$route.name
      );
      if (index === 1) {
        //一级目录
        return [];
      } else {
        //二级目录
        return [this.$route.matched[1].name];
      }
    },
    // 获取用户信息
    ...mapState({
      userInfo: (state) => state.user.info,
      isAdmin: (state) => state.user.info.isAdmin,
    }),
    // 获取用户权限
    ...mapGetters({
      userAuth: "user/userAuth",
    }),
    //计算菜单栏
    menuData() {
      let newRoute1 = [];
      //管理员拥有所有的权限。
      if (this.isAdmin) {
        newRoute1 = mainRoute.children;
      } else {
        mainRoute.children.forEach((route) => {
          if (route.name === "home") {
            newRoute1.push(route);
          } else {
            // 查找一级目录
            const result = this.userAuth.find((item) => item === route.name);
            let isSave1 = false;
            if (result) {
              //保存一级目录
              isSave1 = true;
            } else {
              // 查找二级目录
              const newRoute2 = [];
              route.children &&
                route.children.map((child) => {
                  const result2 = this.userAuth.find(
                    (item) => item === child.name
                  );
                  if (result2) {
                    //保存二级目录
                    newRoute2.push(child);
                  }
                });
              if (newRoute2.length > 0) {
                isSave1 = true;
                route.children = newRoute2; //真正这是二级目录
              }
            }
            // 判断这个一级目录下，是否有任意一个路由保存了,如果有，这个路由要保存
            if (isSave1) {
              newRoute1.push(route);
            }
          }
        });
      }
      return newRoute1;
    },
  },
  watch: {
    // 监听用户权限的变化
    menuData: {
      // 监听菜单栏的变化
      handler(newVal, oldVal) {
        console.log(newVal);
        // 添加路由前的路由：
        // 移除上一次的app路由配置
        const index = this.$router.options.routes.findIndex(item=>item.name=='app');
        this.$router.options.routes.splice(index, 1, 0);
        // 动态添加路由
        this.$router.addRoutes([
          {
            path: "/",
            name: 'app',
            component: () => import("../layout/Index"),
            children: newVal,
          },
        ]);
      },
      immediate: true,
    },
  },
  methods: {
    changeRouteAction({ key }) {
      this.$router.push({ name: key });
    },
  },
  created() {},
};
</script>

<style>
</style>

