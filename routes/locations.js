const express = require('express');
const router = express.Router();
const db = require('../db');

console.log('Loading locations router...');

/* GET locations listing. */
router.get('/', (req, res, next) => {
  const query = 'SELECT im.name AS star_name, im.longitude, im.latitude,im.number,im.address FROM images_message im ORDER BY im.name, im.longitude, im.latitude;';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const formattedResults = results.map(result => {
      console.log('Result:', result); // 打印每条记录
      if (result.number === undefined || result.number === null) {
        console.error('Missing or null number field in result:', result);
        return null; // 跳过缺少 number 字段的记录
      }

      return {
        name: result.star_name,
        latitude: parseFloat(result.latitude),
        longitude: parseFloat(result.longitude),
        number: result.number,
        address: result.address // 添加 address 字段
      };
    }).filter(Boolean); // 过滤掉 null 记录

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.json(formattedResults);
  });
});

console.log('Exporting locations router...');
module.exports = router;
