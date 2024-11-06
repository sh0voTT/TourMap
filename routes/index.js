const express = require('express');
const router = express.Router();

// 定义一个简单的路由
router.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

module.exports = router; // 确保导出的是router
