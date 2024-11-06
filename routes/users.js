const express = require('express');
const router = express.Router();

// 定义用户相关的路由
router.get('/', (req, res) => {
  res.send('User list');
});

module.exports = router; // 确保导出的是router
