const http = require("http");
const chalk = require("chalk");
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

// 连接数据库
mongoose.connect(
  `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(chalk.red("数据库连接失败:"));
      console.log(chalk.red(error));
    } else {
      console.log("数据库连接成功。");
      startServer();
    }
  }
);

// 启动服务
const startServer = () => {
  const server = http.createServer(app);

  server.on("error", (error) => {
    console.log(chalk.red("服务器出错了:"));
    console.log(chalk.red(error));
  });

  server.listen(config.port, config.host, () => {
    console.log(chalk.white("服务器启动成功:"));
    console.log(chalk.green(`http://${config.host}:${config.port}`));
  });
};
