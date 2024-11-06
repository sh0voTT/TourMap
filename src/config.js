module.exports = {
  port: 3000, // express 服务启动端口
  /* 数据库相关配置 */
  db: {
    host: 'localhost', // 主机名
    port: 3306,        // MySQL 默认端口为 3306
    user: 'tourmap',          // 使用 root 用户登入 MySQL
    password: 'fivegroup5', // MySQL 密码，用你自己的
    database: 'tourmap' // 使用数据库
  }
}
