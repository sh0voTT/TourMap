const express = require('express');
const router = express.Router();
const db = require('../db');

// 处理注册请求
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // 检查用户是否已存在
  db.query('SELECT * FROM user WHERE userName = ?', [username], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: false, message: '用户已存在' });
      return;
    }

    // 插入新用户
    db.query('INSERT INTO user (userName, userPwd) VALUES (?, ?)', [username, password], (err, result) => {
      if (err) {
        console.error('Error inserting into the database:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      res.json({ success: true, message: '注册成功' });
    });
  });
});

module.exports = router;