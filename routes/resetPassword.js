// routes/resetPassword.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 处理密码重置请求
router.post('/reset', (req, res) => {
  const { username, newPassword } = req.body;

  // 查询用户数据
  db.query('SELECT * FROM user WHERE userName = ?', [username], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ status: 'internal_server_error', message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.json({ status: 'user_not_found' });
      return;
    }

    const user = results[0];

    // 检查新密码是否与旧密码相同
    if (user.userPwd === newPassword) {
      res.json({ status: 'same_password' });
      return;
    }

    // 更新用户密码
    db.query('UPDATE user SET userPwd = ? WHERE userName = ?', [newPassword, username], (err, result) => {
      if (err) {
        console.error('Error updating the database:', err);
        res.status(500).json({ status: 'internal_server_error', message: 'Internal server error' });
        return;
      }

      res.json({ status: 'success' });
    });
  });
});

module.exports = router;