import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goods: [],
    categorygoods: [],
    goodsdetail: [],
    order: [],
    appuser: '1'
  },
  mutations: {
    //商品
    setGoods(state, payload) {
      state.goods = payload;
    },
    //分类商品
    setCategoryGoods(state, payload) {
      state.categorygoods = payload;
    },
    //商品详情
    setGoodsDetail(state, payload) {
      state.goodsdetail = payload;
    },
    //购物车数据
    setOrder(state, payload) {
      state.order = payload;
    },
    setAppuser(state, payload){
      state.appuser = payload;
    }
  },
  actions: {
    //商品数据
    requestGoods(context) {
      axios.post("/api/goods/goods_info").then((data) => {
        context.commit("setGoods", data.data.data);
      });
    },
    //分类数据
    requestCategoryGoods(context, payload) {
      axios
        .post("/api/goods/goods_category", {
          goodsname: payload,
        })
        .then((data) => {
          context.commit("setCategoryGoods", data.data.data);
        });
    },
    //商品详情
    requestGoodsDetail(context, payload) {
      axios.post("/api/goods/goods_detail", { id: payload }).then((data) => {
        context.commit("setGoodsDetail", data.data.data);
      });
    },
    //加入购物车
    requestOrder(context, payload) {
      axios
        .post("/api/order/add", {
          appuserid:payload.appueserId,
          id: payload.goodsdetail._id,
          ordername: payload.goodsdetail.goodsname,
          orderprice: payload.goodsdetail.goodsprice,
          ordernum: 1,
        })
        .then((data) => {
          console.log(data);
        });
    },
    //展示购物车
    requestOrderList(context,payload) {
      axios.get("/api/order/order_info").then((data) => {
        console.log(data.data.data);
        console.log(payload);
        const newData = data.data.data.filter(item => item.appuserid === payload);
        console.log(newData);
        
        context.commit("setOrder", newData);
      });
    },
    //增加减少购物车数量
    requsetOrderChange(context, payload) {
      axios
        .post("/api/order/order_change", {
          type: payload.type,
          ordername: payload.ordername,
        })
        .then((data) => {
          console.log(data);
        });
    },
    requsetAppuser(context, payload) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer" + localStorage.getItem("token");
      axios.get("/api/appuser/info").then(data => {
        console.log(data.data.data._id);
        context.commit('setAppuser',data.data.data._id)
      })
    },
  },
  modules: {},
});
