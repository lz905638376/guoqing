const {model} = require('mongoose');

module.exports = model('user', {
  // 账号
  username: {
    type: String,
    required: true
  },
  // 密码
  password: {
    type: String,
    default: '123456',
  },
  // 姓名
  nickname: {
    type: String,
    required: true,
  },
  // 手机号
  phonenumber: {
    type: String,
    required: true,
  },
  // 职位
  job: {
    type: String,
    required: true,
  },
  // 权限
  auth: {
    type: Array,
    default: []
  },
  // 是否是管理员
  isAdmin: {
    type: Boolean,
    default: false
  }
});