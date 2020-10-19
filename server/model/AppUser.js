const {model} = require('mongoose');

module.exports = model('appuser', {
  // 账号
  username: {
    type: String,
    required: true
  },
  // 密码
  password: {
    type: String,
    required: true
  },
});