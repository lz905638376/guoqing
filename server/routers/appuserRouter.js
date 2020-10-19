const { Router } = require("express");
const JWT = require("jsonwebtoken");
const User = require("../model/AppUser");
const config = require("../config");
const router = new Router();

// 注册
router.post("/register", async (req, res) => {
    // 获取参数
    const { username, password } = req.body;
    // 判断账号是否可以使用
    const result = await User.findOne({ username });
    if (result) {
      // 存在
      res.json({
        code: -2,
        message: "该账号已经存在",
      });
      return;
    }
    // 注册
    const user = await new User({
      username,
      password,
    }).save();
    // 响应客户端
    res.json({
      code: 0,
      message: "ok",
    });
    res.status(200).json({code: 0, message: '注册成功'});
});

// 登录
router.post("/login", async (req, res) => {
    // 取得参数
    const { username, password } = req.body;
    // 登录
    const result = await User.findOne(
      { username, password },
      { password: false }
    );
    if (result) {
      // 使用JWT保存用户登录状态
      // 第1步：生成token
      const token = JWT.sign(
        {
          username: result.username,
        },
        config.token_key,
        { expiresIn: config.expiresIn }
      );
      
      // 第2步：保存token
      //登录成功
      res.json({
        code: 0,
        message: "ok",
        data: {
          token,
        },
      });
    } else {
      //登录失败
      res.json({
        code: -2,
        message: "登录失败，用户名或密码错误",
      });
    }
    res.status(200).json({code: 0, message: '登录成功'});
});

// 中间件：解析token
// router.use(async (req, res, next)=>{
//     //http，
//   // cookies:将数据存放在客户端(数据就设置在cookies中了)
//   // session:将数据存放在服务器中
//   // token:将数据存放在客户端(数据设置在响应头上，不是每一次请求都会携带过去)，加密

//   try {
//     // 获取用户的token
//     const token = req.headers["authorization"].replace("Bearer ", "");
//     // 解析token
//     const result = JWT.verify(token, config.token_key);
//     // 使用
//     const userInfo = await User.findOne(
//       { acount: result.acount },
//       { password: false }
//     );
//     req.userInfo = userInfo;
//     next();
//   } catch (error) {
//     res.json({
//       code: -1,
//       message: '请重新登录!'
//     });
//   }
// })

// // 检查登录是否过期
// router.get('/check_login', async (req, res)=>{
//   res.json({
//     code: 0,
//     message: 'ok',
//     data: null
//   });
// });

// 查询用户信息
router.get("/info", async (req, res) => {
  // res.json({
  //   code: 0,
  //   message: "ok",
  //   data: req.userInfo,
  // });

    const token = req.headers['authorization'].replace('Bearer','');
    const result = JWT.verify(token,config.token_key);
    const userInfo = await User.findOne(
        {username: result.username},{password:false}
    );
    console.log(userInfo);

    res.json({
        code: 0,
        message: "ok",
        // data: req.userInfo,
        data: userInfo
    });
});

module.exports = router;
