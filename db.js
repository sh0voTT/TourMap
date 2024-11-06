const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '49.232.148.121',
  user: 'tourmap',
  password: 'fivegroup5',
  database: 'tourmap'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    // 如果连接失败，终止应用
    process.exit(1);
  }
  console.log('Connected to the database');
});

// 监听连接断开事件
connection.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  } else {
    console.error('Database error:', err);
  }
  // 尝试重新连接
  setTimeout(() => {
    connectToDatabase();
  }, 2000); // 2秒后重试
});

function connectToDatabase() {
  connection.connect((err) => {
    if (err) {
      console.error('Error reconnecting to the database:', err);
      process.exit(1);
    }
    console.log('Reconnected to the database');
  });
}

module.exports = connection;