const mysql = require('mysql');

// 配置数据库连接信息
const connection = mysql.createConnection({
  host: '49.232.148.121',  // 主机地址
  port: 3306,               // 端口号
  user: 'tourmap',          // 用户名
  password: 'fivegroup5',   // 密码
  database: 'tourmap'       // 数据库名称
});

// 尝试连接到数据库
connection.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err);
    return;
  }
  console.log('成功连接到数据库');
});

module.exports = connection;
