const express = require('express');
const router = express.Router();
const db = require('../db');

console.log('Loading locations router...');

// 处理登录请求
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 查询用户数据
  db.query('SELECT * FROM user WHERE userName = ? AND userPwd = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

module.exports = router;
